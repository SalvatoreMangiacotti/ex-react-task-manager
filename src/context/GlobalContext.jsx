// Hooks
import { createContext } from "react";
import useTasks from "../hooks/useTasks";

// Contesto globale
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    const taskData = useTasks()

    return (
        <GlobalContext.Provider value={{ ...taskData }}>
            {children}
        </GlobalContext.Provider>
    );

}

export default GlobalContext;