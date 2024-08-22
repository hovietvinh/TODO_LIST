import { Button, Card,Form, Input } from 'antd';
import {SearchOutlined} from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux";
import { getTaskByCondition } from "../../redux/actions/TaskAction";
import {useSearchParams} from "react-router-dom"
import { useEffect } from "react";
function FilterSearch(props) {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const task = useSelector(state => state.TaskReducer)
    let [searchParams, setSearchParams] = useSearchParams();
    const changeStatus = (status)=>{
        const keyword = searchParams.get('keyword') || '';
        let objectSearch={}
        if(keyword){
            objectSearch.keyword=keyword
        }
        if(status){
            objectSearch.status=status
        }
        setSearchParams(objectSearch);
        dispatch(getTaskByCondition(objectSearch));
        
    }
    useEffect(() => {
        const keyword = searchParams.get('keyword') || '';
        const status = searchParams.get("status") || '';
        const objectSearch = {
            keyword:keyword,
            status:status
        }
        form.setFieldsValue({ keyword });

        dispatch(getTaskByCondition(objectSearch));
    }, [searchParams, dispatch, form]);
    
    const handleSearch = (values) => {
        // Lấy các giá trị từ form
        const { keyword } = values;
        const status = searchParams.get("status") || '';
        let objectSearch={}
        if(keyword){
            objectSearch.keyword=keyword
        }
        if(status){
            objectSearch.status=status
        }
        
        // Thêm params vào URL
        setSearchParams(objectSearch);

        // Dispatch action để tìm kiếm
        dispatch(getTaskByCondition(values));

        // Bỏ focus khỏi form sau khi submit
        if (document.activeElement) {
            document.activeElement.blur();
        }
    };
    return (
        <>
            <Card className="mt-10  mx-10"
                title={
                <div className="bg-[#F4F5F7] text-[16px] font-normal py-4 px-6 text-black">
                    Bộ lọc và tìm kiếm
                </div>
                }
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 justify-between" >
                        <Button onClick={()=>changeStatus("")} className="bg-[#F4F5F7] text-black border border-gray-400" size="middle">
                        Tất cả
                        </Button>
                        <Button onClick={()=>changeStatus("initial")} className="bg-[#D1D5DB] text-black" size="middle">
                            Khởi tạo
                        </Button>
                        <Button onClick={()=>changeStatus("doing")} className="bg-doing text-white" size="middle">
                        Đang làm
                        </Button>
                        <Button onClick={()=>changeStatus("finish")} className="bg-finish text-white" size="middle">
                        Hoàn thành
                        </Button>
                        <Button onClick={()=>changeStatus("notfinish")} className="bg-not_finish text-white" size="middle">
                        Không hoàn thành
                        </Button>
                    </div>

                    <Form  onFinish={handleSearch}  form={form}>
                        <Form.Item name="keyword" className=" m-0">
                            <Input onPressEnter={() => form.submit()} placeholder="search" prefix={<SearchOutlined />} size="large"/>
                        </Form.Item>
                    </Form>
                </div> 
            </Card>
        </>
    );
}

export default FilterSearch;