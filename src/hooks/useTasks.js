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

            const { success, message, task } = await response.json();

            // In caso di errore
            if (!success) {
                throw new Error(message);
            }

            // Aggiorna lo stato locale con la nuova task + le precedenti
            setTasks(prev => [...prev, task]);

            // In caso di successo
            console.log("Task creata con successo:", task);

        } catch (error) {
            // Messaggio di errore
            console.error("Errore nell'aggiunta della task:", error.message);
            alert(`Errore: ${error.message}`);
        }
    };


    const removeTask = async (taskId) => {
        try {

            const requestConfig = {
                method: "DELETE"
            }

            const response = await fetch(`${apiUrl}/tasks/${taskId}`, requestConfig);

            const data = await response.json();

            // In caso di errore
            if (!data.success) {
                throw new Error(data.message);
            }

            // In caso di successo la task viene rimossa
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));

        } catch (error) {
            // Messaggio di errore
            console.error("Errore nell'eliminazione della task:", error.message);
            alert(`Errore: ${error.message}`);
        }
    }


    const updateTask = async (updatedTask) => {
        try {
            const requestConfig = {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTask)
            };

            // Chiamata API PUT per aggiornare la task
            const response = await fetch(`${apiUrl}/tasks/${updatedTask.id}`, requestConfig);

            const data = await response.json();

            // In caso di errore
            if (!data.success) {
                throw new Error(data.message);
            }

            // Aggiorna lo stato locale sostituendo la task aggiornata
            setTasks(prevTasks =>
                prevTasks.map(task => task.id === data.task.id ? data.task : task)
            );

            // In caso di successo
            console.log("Task aggiornata con successo:", data.task);

        } catch (error) {
            // Messaggio di errore
            console.error("Errore nell'aggiornamento della task:", error.message);
            alert(`Errore: ${error.message}`);
        }
    };

    return { tasks, addTask, removeTask, updateTask };

}

export default useTasks;