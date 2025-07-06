// Hooks
import { useState, useEffect, useRef } from "react";

// Componenti
import Modal from './Modal'


function EditTaskModal({ show, onClose, task, onSave }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const formRef = useRef(null);


    useEffect(() => {
        if (task) {
            setTitle(task.title || '');
            setDescription(task.description || '');
        }
    }, [task]);

    // handleConfirm attiva il submit del form
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...task,
            title,
            description,
        });
        onClose();
    };

    // Il form esegue handleSubmit che salva e chiude la modale
    const handleConfirm = () => {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    };


    const content = (
        <form ref={formRef} onSubmit={handleSubmit}>
            <div>
                <label>Titolo</label><br />
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Descrizione</label><br />
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
        </form>
    );


    return (
        <Modal
            title="Modifica Task"
            content={content}
            show={show}
            onClose={onClose}
            onConfirm={handleConfirm}
            confirmText="Salva"
        />
    );
}

export default EditTaskModal;
