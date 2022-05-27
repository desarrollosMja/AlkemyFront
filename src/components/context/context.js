import { createContext, useEffect, useState } from "react";
import { config } from "../../config"

export const context = createContext()
const { Provider } = context

console.log("1")

export const ProviderContext = ({children}) => {
    const [user, setUser] = useState()
    const [operations, setOperations] = useState([])
    const [balance, setBalance] = useState(0)

    const contextValue = {
        user,
        setUser,
        operations,
        setOperations,
        balance,
        setBalance,
    }

    useEffect(() => {
        fetch(`http://localhost:${config.BACK_PORT}/api/inputs/operations`)
            .then(res => res.json())
            .then(json => {
                let aux = 0
                for(let entry of json) {
                    if (entry.type == "input") aux += entry.amount
                    if (entry.type == "output") aux -= entry.amount
                }
                setBalance(aux)
                setOperations(json)
            })
            .catch(err => console.log(err))
    })

    return(
        <Provider value={contextValue}>
            {children}
        </Provider>
    )
}