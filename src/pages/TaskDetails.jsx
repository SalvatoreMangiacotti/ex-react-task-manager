// Hooks
import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Componenti
import GlobalContext from "../context/GlobalContext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";


function TaskDetails() {

    const { id } = useParams();

    // Hook per navigare tra le pagine
    const navigate = useNavigate();

    // task e funzioni del contesto globale
    const { tasks, removeTask, updateTask } = useContext(GlobalContext);

    // Trova l'id della task
    const task = tasks.find(task => task.id.toString() === id);

    // Stato conferma eliminazione
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    // stato modifica task
    const [showEditModal, setShowEditModal] = useState(false);


    // Se la task non viene trovata
    if (!task) {
        return <h2>Task non trovata!</h2>
    }


    // Funzione per eliminare la task
    const handleDelete = async () => {
        try {
            await removeTask(id);
            alert("Task eliminata con successo");
            navigate("/"); // riporta alla lista delle task
        } catch (error) {
            alert(`Errore: ${error.message}`);
        }
    };


    // Funzione per aggiornare la task
    const handleTaskUpdate = async (updatedTask) => {
        try {
            await updateTask(updatedTask);
            alert("Task modificata con successo");
            setShowEditModal(false)
        } catch (error) {
            alert(`Errore: ${error.message}`);
        }
    };


    return (
        <div>
            <h2>{task.title}</h2>
            <span>Descrizione: {task.description}</span><br />
            <span>Stato: {task.status}</span><br />
            <span>Data di creazione: {new Date(task.createdAt).toLocaleDateString()}</span><br />

            {/* Bottone per aprire la modale elimina task */}
            <button onClick={() => setShowDeleteModal(true)}>Elimina la task</button>
            {/* Bottone per aprire la modale modifica */}
            <button onClick={() => setShowEditModal(true)}>Modifica Task</button>


            {/* Modale di conferma eliminazione */}
            <Modal
                show={showDeleteModal}
                title="Conferma Eliminazione"
                content={`Sei sicuro di voler eliminare la task "${task.title}"?`}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                confirmText="Elimina"
            />


            {/* Modale per modificare il task */}
            <EditTaskModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                task={task}
                onSave={handleTaskUpdate}
            />
        </div>
    );
}

export default TaskDetails;
