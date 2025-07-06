// Hooks
import { useState, useEffect } from "react";

// API (.env)
const apiUrl = import.meta.env.VITE_API_URL;

function useTasks() {

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


    const addTask = async (newTask) => {
        try {
            const requestConfig = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            };

            // Chiamata API con la struttura definita in "requestConfig"
            const response = await fetch(`${apiUrl}/tasks`, requestConfig);

            const data = await response.json();

            // In caso di errore errore
            if (!data.success) {
                console.error("Errore:", data.message);
            }

            // Aggiorna lo stato locale con la nuova task + le precedenti
            setTasks(prev => [...prev, data.task]);

            // In caso di successo
            console.log("Task creata con successo:", data.task);

        } catch (error) {
            // Messaggio di errore
            console.error("Errore nell'aggiunta della task:", error.message);
        }
    };


    const removeTask = () => {
        // logica
    }

    const updateTask = () => {
        // logica
    }

    return { tasks, addTask, removeTask, updateTask };

}

export default useTasks;