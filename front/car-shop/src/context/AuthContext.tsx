import React from "react";
import { createContext, useContext } from "react";

type ContextType = {
    email: string | null,
    token: string | null,
    name: string | null,
    //userId: string | null,
}
interface UserContext{
    contextData : ContextType | null,
    setContextData : (data : ContextType )=>void,
}

const AuthContext = createContext<UserContext>({
    contextData: null,
    setContextData: (value: (ContextType | null))=>{}
})


export const ContextProvider = (props: {children: any})=>{
    
    const [contextData, setContextData] = React.useState<ContextType | null>(null);
    
    return(
        <AuthContext.Provider value={{contextData, setContextData}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{

    return (useContext(AuthContext));
};