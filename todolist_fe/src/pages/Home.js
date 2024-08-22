import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react";
import {getUser} from "../redux/actions/UserAction"
import { Button, Space, Tag } from 'antd';
import {Link} from "react-router-dom"
import Cookies from 'js-cookie';

import FilterSearch from "../components/FilterSearch";
import SHowTasks from "../components/ShowTasks";
function Home() {
    const dispatch = useDispatch()
    

    let user = useSelector(state => state.UserReducer)
    const getUserDetail = ()=>{
      const token = Cookies.get('token');
        dispatch(getUser(token))
    }
    
    useEffect(()=>{
      getUserDetail()
       
    },[])
    
  
    

    
    
      
    return (
        <>
            <div className="w-full h-full">
                <div className="flex pt-5 px-10 items-center justify-between">
                    <h1 className=" text-[28px] ">Công việc của tôi</h1>
                    <div className="flex m-0 gap-3">
                      {user.length > 0 && (
                            <>
                                <Link to="/user/detail">
                                    <Button className="bg-blue-500 text-[14px] text-white" size="large">
                                        {user[0].fullName}
                                    </Button>
                                </Link>
                                <Link to="/logout">
                                    <Button className="bg-red-500 text-[14px] text-white" size="large">
                                        Đăng xuất
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <FilterSearch/>
                <SHowTasks/>
                
            </div>
        </>
    );
}

export default Home;