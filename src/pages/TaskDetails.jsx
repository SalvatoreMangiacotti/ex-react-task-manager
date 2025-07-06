// Hooks
import { useContext } from "react";
import { useParams } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";

function TaskDetails() {

    const { id } = useParams();
    const { tasks } = useContext(GlobalContext);

    // Trova l'id della task
    const task = tasks.find(task => task.id.toString() === id);

    const handleDelete = () => {
        console.log("Elimina la task");
    };

    return (
        <div>
            <h2>{task.title}</h2>
            <span>Descrizione: {task.description}</span>
            <span>Stato: {task.status}</span>
            <span>Data di creazione: {new Date(task.createdAt).toLocaleDateString()}</span>
            <button onClick={handleDelete}>Elimina la task</button>
        </div>
    );
}

export default TaskDetails;
