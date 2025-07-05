// Hooks
import { createContext } from "react";
import useTasks from "../hooks/useTasks";

// Contesto globale
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    const tasksFunctions = useTasks()

    return (
        <GlobalContext.Provider value={tasksFunctions}>
            {children}
        </GlobalContext.Provider>
    );

}

export default GlobalContext;