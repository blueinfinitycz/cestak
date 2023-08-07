import { createContext, useState,FC } from "react";

const AuthContext = createContext({});

export const AuthProvider:FC = ({ children }:any) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;