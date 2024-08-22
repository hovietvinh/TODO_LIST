import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; 
function Logout(props) {
    const navigate = useNavigate();
    useEffect(()=>{
        Cookies.remove('token');
        
        navigate("/login")
    },[])
    
    return (
        <>
        </>
    );
}

export default Logout;