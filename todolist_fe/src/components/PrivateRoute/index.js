
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/actions/UserAction";

function PrivateRoute() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.UserReducer);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            await dispatch(getUser());
            setLoading(false);
        };

        fetchUser();
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (user && user.length > 0) {
        return <Outlet />; // Render protected routes
    }

    return <Navigate to="/login" />; // Redirect to login if user is not authenticated
}

export default PrivateRoute;
