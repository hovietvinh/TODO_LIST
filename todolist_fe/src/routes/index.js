import LayoutDefault from "../Layouts/LayoutDefault";
import Login from "../pages/Login";
import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Logout from "../pages/Logout";
import PrivateRoute from "../components/PrivateRoute";
import Detail from "../pages/Detail";
import CreateProject from "../pages/CreateProject";
import EditProject from "../pages/EditProject";

export const routes = [
    {
        path:"/",
        element:<LayoutDefault/>,
        children:[
            {
                element:<PrivateRoute/>,
                children:[
                    {
                        index: true,
                        element: <Navigate to="/projects" replace />,
                    },
                    {
                        
                        path:"/projects",
                        element:<Home/>
                    },
                    {
                        path:"/projects/home",
                        element:<Home/>
                    },
                    {
                        path:"/projects/create",
                        element:<CreateProject/>
                    },
                    {
                        path:"/projects/edit/:id",
                        element:<EditProject/>
                    },
                    {
                        path:"/user/detail",
                        element:<Detail/>
                    },
                    
                ]
            }
        ]
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/logout",
        element: <Logout/>
    }
    
];
