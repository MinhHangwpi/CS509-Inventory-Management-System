import { resolveComponentProps } from '@mui/base';
import { computeColumnTypes } from '@mui/x-data-grid/hooks/features/columns/gridColumnsUtils';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import React from 'react';
import Pool from './UserPool';

const AuthContext = React.createContext({
    // token: "",
    // isLoggedIn: false,
    // login: (token) => { },
    // logout: () => { }
});


export const AuthContextProvider = (props) => {

    /**Old code from Maximillian's tutorial */
    // const [token, setToken] = React.useState(null);

    // const userIsLoggedIn = !!token;

    // const LoginHandler = (token) => {
    //     setToken(token);
    // };
    // const LogoutHandler = () => {
    //     setToken(null);
    // }

    // const contextValue = {
    //     token: token,
    //     isLoggedIn: userIsLoggedIn,
    //     login: LoginHandler,
    //     logout: LogoutHandler
    // }

    const getSession = async () =>
        await new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser();
            if (user) {
                user.getSession((err, session) => {
                    if (err) {
                        reject();
                    } else {
                        resolve(session);
                    }
                })
            } else {
                reject();
            }
        });


    //this authenticate function can be exported through AuthContextProvider

    const authenticate = async (Username, Password) => {
        await new Promise((resolve, reject) => {
            const user = new CognitoUser({ Username, Pool });

            const authDetails = new AuthenticationDetails({ Username, Password });

            user.authenticateUser(authDetails, {
                onSuccess: data => {
                    console.log('onSuccess:', data);
                    resolve(data);
                },
                onFailure: err => {
                    console.log('onFailure: ', err);
                    reject(err);
                },
                newPasswordRequired: data => {
                    console.log('newPasswordRequired: ', data);
                    resolve(data);
                }
            })
        })
    }

    const logout = () => {
        const user = Pool.getCurrentUser();
        console.log(user);
        console.log("triggered logout!")
        if (user) {
            user.signOut();
        }
    }

    const signup = async (Email, Password, UserRole) => {

        let attributeList = [];

        const dataRole = {
            Name: 'custom:role',
            Value: UserRole.toLowerCase()
        }
        const attributeRole = new CognitoUserAttribute(dataRole);
        attributeList.push(attributeRole);

        console.log(Email);
        console.log(Password);
        console.log(UserRole.toLowerCase());
        Pool.signUp(Email, Password, attributeList, null, (err, data) => {
            if (err) console.error(err);
            console.log(data);
        })
    }



    return <AuthContext.Provider value={{ authenticate, getSession, logout, signup }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;