// Hooks
import { useContext } from "react";
import { useParams } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

function TaskDetails() {

    const { id } = useParams();
    const { tasks, removeTask } = useContext(GlobalContext);
    const navigate = useNavigate()

    // Trova l'id della task
    const task = tasks.find(task => task.id.toString() === id);

    const handleDelete = async () => {
        try {
            await removeTask(id);
            alert("Task eliminata con successo");
            navigate("/"); // riporta alla lista delle task
        } catch (error) {
            alert(`Errore: ${error.message}`);
        }
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
