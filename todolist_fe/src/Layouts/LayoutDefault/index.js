import {  NavLink, Outlet } from "react-router-dom";
import Menu from "../../components/Menu";
function LayoutDefault(props) {
    return (
        <>
            <div className="min-w-[768px] min-h-[100vh] h-[100vh] flex">
                <div className="bg-[#F4F5F7] sticky top-0 left-0 bottom-0 w-[250px] h-full px-7 text-black overflow:hidden transition-all duration-500 ease-linear">
                    <h1 className="text-[28px] text-blue-400 pt-4 pb-6 ">Todolist</h1>
                    <Menu/>
                   
                </div>
                <Outlet/>
            </div>
        </>
    );
}

export default LayoutDefault;