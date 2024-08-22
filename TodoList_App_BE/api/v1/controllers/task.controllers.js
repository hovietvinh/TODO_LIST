const paginationHelpers = require("../../../helpers/pagination.helpers")
const searchHelpers = require("../../../helpers/search.helpers")
const Task = require("../models/task.model")

//[GET] /api/v1/tasks
module.exports.index = async (req, res) => {
    const find = {
        deleted: false,
        $or:[
            {createdBy:req.user.id},
           
        ]
    }
    if (req.query.status) {
        find.status = req.query.status
    }

    // search
    let objectSearch = searchHelpers(req.query)
    if(req.query.keyword){
        find.title = objectSearch.regex;
    }

    //sort
    const sort = {}
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
    }


    // pagination
    // const initPagination = {
    //     currentPage: 1,
    //     limitItems: 3
    // }
    // const countTasks = Task.countDocuments(find);
    // const objectPagination = paginationHelpers(initPagination, req.query, countTasks);




    const result = await Task.find(find).sort(sort)
    return res.json(result)
}

//[GET] /api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const result = await Task.findOne({
            deleted: false,
            _id: id
        })
        return res.json({
            code:200,
            data:result
        })
    } catch (e) {

        return  res.json({
            code:400,
            message:"ID không hợp lệ"
        })
    }

}

//[PATCH] /api/v1/tasks/change-status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const {id} = req.params
        const {status} = req.body
        await Task.updateOne({_id:id},{status:status})
        return res.json({
            code:200,
            message:"cap nhat thanh cong"
        })
    } catch (e) {

        return res.json({
            code:400,
            message:"cap nhat khong thanh cong"
        });
    }

}
//[PATCH] /api/v1/tasks/change-multi
module.exports.changeMulti = async (req, res) => {
    try {
       
        const {key,value,ids} = req.body
        switch (key) {
            case "status":
                await Task.updateMany({_id:{$in:ids}},{status:value})
                res.json({
                    code:200,
                    message:"cap nhat thanh cong"
                })
                break;
            
            case "delete":
                await Task.updateMany({_id:{$in:ids}},{deleted:true,deletedAt:new Date()})
                res.json({
                    code:200,
                    message:"cap nhat thanh cong"
                })
                break;
        
            default:
                res.json({
                    code:400,
                    message:"cap nhat khong thanh cong"
                })
                break;
        }
        
    } catch (e) {

        res.json({
            code:400,
            message:"cap nhat khong thanh cong"
        });
    }

}


//[POST] /api/v1/tasks/create
module.exports.create = async (req, res) => {
    try{
        req.body.createdBy = req.user.id
        const task = await Task.create(req.body);
        const data = await task.save()
        res.json({
            code:200,
            message:"Tạo thành công",
            data:data
        })
    }catch(e){
        res.json({
            code:400,
            message:"Lỗi!"
        })
    }

}

//[PATCH] /api/v1/task/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id
        await Task.updateOne({_id:id},req.body)
        res.json({
            code:200,
            message:"Cập nhật thành công!"
        })
    } catch (error) {
        res.json({
            code:400,
            message:"Lỗi!"
        })
    }
    

}


//[DELETE] /api/v1/tasks/delete/:id
module.exports.delete = async (req, res) => {
    try {
        const {
            id
        } = req.params
        await Task.updateOne({_id:id},{deleted:true,deletedAt:new Date()})
        return res.json({
            code:200,
            message:"Xóa thành công!"
        })
    } catch (e) {

        return res.json({
            code:400,
            message:"Lỗi!"
        })
    }

}