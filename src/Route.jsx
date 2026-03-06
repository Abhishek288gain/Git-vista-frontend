import React , {useEffect} from "react";
import {useNavigate, useRoutes} from 'react-router-dom'

//pages lists
import DashBoard from "./component/dashboard/DashBoard";
import Profile from "./component/user/Profile";
import Signup from "./component/authentication/Signup.jsx";

import LogIn from "./component/authentication/logIn";

//Auth Context
import { useAuth } from './AuthContext.jsx';

const ProjectRoutes = () => {
    const {currentUser, setCurrentUser} = useAuth();
    const navigate = useNavigate();// It is return method for chaining the location for user

    useEffect(() => { //useEffect is for when the first time compo is render. we check curUSer logged or not.
        const useIdFromStorage = localStorage.getItem("userId"); 

        if(useIdFromStorage && !currentUser){ // it mean curUser != NULL. it is loggedIn already.
            setCurrentUser(useIdFromStorage);// re-render the compo with loggedIn user
        }

        if(!useIdFromStorage && !["/auth", "/signup"].includes(window.location.pathname)){ // in localStorage thier userId is not Exist and it is not available
                                //  at these route ("/auth", "/signup"). it mean user not logIn. .
            navigate("/auth"); // so we have redirect the user at logIn compo or "/auth" route
        }

        //if user already logged and they stand logIn or signup page. 
        if(useIdFromStorage && window.location.pathname == "/auth"){ 
            setCurrentUser(useIdFromStorage);//so we have to re-direct them to dashboard
        }
        
    } , [currentUser, navigate, setCurrentUser]);//if any one val is change during loggedIn then reLoad the page and call useEffect again

    const element = useRoutes([
        {
            path: "/",
            element:<DashBoard/>
        },
        {
            path: "/auth",
            element:<LogIn/>
        },
        {
            path: "/signup",
            element:<Signup/>
        },
        {
            path: "/profile",
            element:<Profile/>
        }
    ]);

    return element;
}
export default ProjectRoutes;