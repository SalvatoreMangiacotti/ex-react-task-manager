// Hooks
import { createContext, useContext, useState, useEffect } from "react";

// Contesto globale
const GlobalContext = createContext();


const apiUrl = import.meta.env.VITE_API_URL;

export const useGlobalContext = () => useContext(GlobalContext);


export const GlobalProvider = ({ children }) => {

    const [tasks, setTasks] = useState()

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
        <GlobalContext.Provider value={{ tasks }}>
            {children}
        </GlobalContext.Provider>
    );

}