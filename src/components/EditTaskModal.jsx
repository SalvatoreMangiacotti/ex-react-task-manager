// Hooks
import { useState, useRef } from "react";

// Componenti
import Modal from './Modal'


function EditTaskModal({ show, onClose, task, onSave }) {

    const [editedTask, setEditedTask] = useState(task);
    const editFormRef = useRef()


    const changeEditedTask = (key, event) => {
        setEditedTask(prev => ({ ...prev, [key]: event.target.value }))
    }

    const { title, description, status } = editedTask;


    // handleConfirm attiva il submit del form
    const handleSubmit = async (e) => {
        e.preventDefault();
        onSave(editedTask);
    };


    const content = (
        <form ref={editFormRef} onSubmit={handleSubmit}>
            <label>Nome task:</label>
            <input
                type="text"
                value={title}
                onChange={event => changeEditedTask('title', event)}
                required
            />

            <label>Descrizione:</label>
            <textarea
                value={description}
                onChange={event => changeEditedTask('description', event)}
            />

            <label>Stato:</label>
            <select
                value={status}
                onChange={event => changeEditedTask('status', event)}
            >
                <option value="To do">To do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
            </select>
        </form>
    );


    return (
        <Modal
            title="Modifica Task"
            content={content}
            show={show}
            onClose={onClose}
            onConfirm={() => editFormRef.current.requestSubmit()}
            confirmText="Salva"
        />
    );
}

export default EditTaskModal;
