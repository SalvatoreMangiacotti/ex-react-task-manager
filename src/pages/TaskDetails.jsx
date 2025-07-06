// Hooks
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Componenti
import GlobalContext from "../context/GlobalContext";
import Modal from "../components/Modal";

function TaskDetails() {

    const { id } = useParams();
    const { tasks, removeTask } = useContext(GlobalContext);
    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false);

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
            <button onClick={() => setShowModal(true)}>Elimina la task</button>
            <Modal
                show={showModal}
                title="Conferma Eliminazione"
                content={`Sei sicuro di voler eliminare la task "${task.title}"?`}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
                confirmText="Elimina"
            />
        </div>
    );
}

export default TaskDetails;
