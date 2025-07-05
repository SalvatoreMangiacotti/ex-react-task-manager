// Hooks
import { createContext, useState, useEffect } from "react";

// Contesto globale
const GlobalContext = createContext();

// API (.env)
const apiUrl = import.meta.env.VITE_API_URL;

export const GlobalProvider = ({ children }) => {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        fetch(`${apiUrl}/tasks`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTasks(data);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <GlobalContext.Provider value={{ tasks, setTasks }}>
            {children}
        </GlobalContext.Provider>
    );

}

export default GlobalContext;