import { useEffect } from 'react';
import moment from 'moment';
import {useDispatch, useSelector} from "react-redux"
import { getUser } from '../redux/actions/UserAction';
function Detail(props) {
    let user = useSelector(state => state.UserReducer)
    let tasks = useSelector(state =>state.TaskReducer)
    const getUserDetail = ()=>{
        dispatch(getUser())
    }
    const dispatch = useDispatch()
    useEffect(()=>{
        getUserDetail()
        
    },[])
    console.log(user[0]);
    const formatDate = (date) => {
        // Sử dụng moment.js để định dạng ngày theo kiểu dd/mm/yyyy
        return moment(date).format('DD/MM/YYYY');
      };
    
    return (
        <>
            {user.length>0 &&(
                <>
                    <div className='w-full h-full'>
                        <div className='pt-5 px-10 flex flex-col gap-3'>
                            <h1 className='text-[28px] mb-5'>Thông tin cá nhân</h1>
                            <div className='flex flex-col gap-1'>
                                <p>Tên người dùng: <b>{user[0].fullName}</b></p>
                                <p>Email: <b>{user[0].email}</b></p>
                                <p>Ngày tạo: <b>{formatDate(user[0].createdAt)}</b></p>
                            </div>
                            
                        </div>
                    </div>
                    
                
                </>

            )}
        </>
    );
}

export default Detail;