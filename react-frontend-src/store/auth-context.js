/**DISABLE AUTHENTICATION FEATURE FOR NOW SO COMMENTING THIS OUT */


import React from 'react';

const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { }
});
// 

export const AuthContextProvider = (props) => {
    const [token, setToken] = React.useState(null);

    const userIsLoggedIn = !!token;

    const LoginHandler = (token) => {
        setToken(token);
    };
    const LogoutHandler = () => {
        setToken(null);
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: LoginHandler,
        logout: LogoutHandler
    }
    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;