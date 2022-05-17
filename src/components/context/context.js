import { createContext, useState } from "react";

export const context = createContext()
const { Provider } = context

export const ProviderContext = ({children}) => {
    const [user, setUser] = useState()

    const contextValue = {
        user: user,
        setUser: setUser
    }

    return(
        <Provider value={contextValue}>
            {children}
        </Provider>
    )
}