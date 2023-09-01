import { createContext, useEffect, useState } from "react";
import { userUserStats } from "../hooks/useUserStats";

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [totalValor,setTotalValor] = useState(0)
    
    return(
        <UserContext.Provider value={{totalValor,setTotalValor}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserContextProducts = createContext()
export const UserProvideProducts = ({children}) => {
    const [categoriaBuscar,setCategoriaBuscar] = useState('All')
    
    return(
        <UserContextProducts.Provider value={{categoriaBuscar,setCategoriaBuscar}}>
            {children}
        </UserContextProducts.Provider>
    )
}
