import {CreditCardOutlined,PlusCircleOutlined,ProfileOutlined,LogoutOutlined } from "@ant-design/icons"
import {  NavLink } from "react-router-dom";
import "./index.css"

function Menu(props) {
    return (
        <>
            <ul className="h-[85%] relative list-none p-0 menu">
                <li>
                    <NavLink 
                        to="/projects" 
                        className={({ isActive }) => (isActive ? 'active' : '') + " navLink"} 
                        end
                    >
                        <CreditCardOutlined className="icon" />
                        <span>Công việc của tôi</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/projects/create" 
                        className={({ isActive }) => (isActive ? 'active' : '') + " navLink"}
                    >
                        <PlusCircleOutlined className="icon" /> 
                        <span>Thêm công việc</span>
                    </NavLink>
                </li>
                <li >
                    <NavLink className={({ isActive }) => (isActive ? 'active' : '') + " navLink" } to="/user/detail">
                        <ProfileOutlined className="icon" />
                        <span>Bản thân</span>
                    </NavLink>
                </li>
                <li className="logout">
                    <NavLink className={({ isActive }) => (isActive ? 'active' : '') + " navLink" } to="/logout">
                        <LogoutOutlined className="icon"/>
                        <span>Đăng xuất</span>
                    </NavLink>
                </li>
            </ul>
        </>
    );
}

export default Menu;