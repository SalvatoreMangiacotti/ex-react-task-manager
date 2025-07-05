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

    const addTask = () => {
        // logica
    }

    const removeTask = () => {
        // logica
    }

    const updateTask = () => {
        // logica
    }

    return { tasks, addTask, removeTask, updateTask };

}

export default useTasks;