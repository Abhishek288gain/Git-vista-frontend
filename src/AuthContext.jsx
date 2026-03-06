//user context API
import React , {createContext, useState, useEffect, useContext} from 'react';

const AuthContext = createContext();//it is constructor.context is peas of data which is available in whole application. its a globle data.
//when user can try to access any route. so that, we perform a check. A user is logdin or not. therefore we create context API so that user can access the check of loggedIn anywhere in app.

export const useAuth = () => { // here, we create a custom Hook. It is give status a curUser is logged or not.
    return useContext(AuthContext);// this Hook is use in Route.jsx
}
//AuthProvider read the curUser and return it
export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null); //when the compo is render first time.currentUser = null. mean user is not loggedIn initaily 
    useEffect(() => {
        const userId = localStorage.getItem("userId");//when user will logIn. we store it userId and jwt Token in localSystem
        if(userId){
            setCurrentUser(userId); // if enter valid userId. then we give of route to user 
        }
    }, []);

    const value = { // we call setCurrentUser function during user logIn. and setUserId which is enter by user 
        currentUser, setCurrentUser
    }
    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
}

