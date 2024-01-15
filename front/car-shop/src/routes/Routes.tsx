import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../catalog/home/HomePage";
import Login from "../catalog/login/Login";
import Register from "../catalog/register/Register";
import Dashboard from "../catalog/dashboard/Dashboard";
import { useAuth } from "../context/AuthContext";


const ProtectedRoute = (props:{children: any})=>{
    const auth = useAuth();
    
    console.log("Protected route: ", auth.contextData);
    localStorage.setItem("user", JSON.stringify(auth.contextData))
    console.log("local storage: ",localStorage.getItem("user"));
    // if(!localStorage.getItem("user")){
    //     return <Navigate to="/login" />
    // }
    if(auth.contextData===null || auth.contextData===undefined || !auth.contextData){
        return <Navigate to="/login" />
    }
    return (
        props.children
    ) 
}

export const router = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        children:[
            {path:"", element:<HomePage />},
            {path:"/login", element:<Login />},
            {path:"/register", element: <Register />},
            {path:"/dashboard", element: (<ProtectedRoute> <Dashboard /></ProtectedRoute>) }
        ]
    }
])