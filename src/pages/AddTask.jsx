// Hooks
import { useState, useRef, useContext } from "react";
import GlobalContext from "../context/GlobalContext";

function AddTask() {

    // Custom hook
    const { addTask } = useContext(GlobalContext);

    // Input controllato per il titolo
    const [title, setTitle] = useState("");

    // Ref per textarea e select non controllati    
    const descriptionRef = useRef();
    const statusRef = useRef();

    // Stato per gestire gli errori
    const [error, setError] = useState("");

    // Simboli vietati
    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Validazione: titolo vuoto
        if (title.trim() === "") {
            setError("Errore: Il titolo non può essere vuoto!");
            return;
        }

        // Validazione: simboli vietati
        if ([...title].some(char => symbols.includes(char))) {
            setError("Errore: Il titolo non può contenere simboli speciali!");
            return;
        }
        // Reminder:
        // [...title] trasforma la stringa in un array di caratteri.
        // .some() verifica se almeno un carattere è presente in symbols.

        // Oggetto con proprietà della nuova task
        const newTask = {
            title: title.trim(),
            description: descriptionRef.current.value.trim(),
            status: statusRef.current.value,
        };

        console.log("Nuovo task:", newTask);

        try {

            await addTask(newTask);

            alert("Task creata con successo!");

            // Reset del form
            setTitle("");
            descriptionRef.current.value = "";
            statusRef.current.value = "To do";

        } catch (error) {
            alert(`Errore nell'aggiunta della task: ${error}`);
        }
    }


    return (
        <>
            <h2>Aggiungi Task</h2>

            <form onSubmit={handleSubmit}>
                <label>
                    Titolo della task:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                {error && <p style={{ color: "red" }}>{error}</p>}

                <label>
                    Descrizione:
                    <textarea ref={descriptionRef} />
                </label>

                <label>
                    Stato:
                    <select ref={statusRef} defaultValue="To do">
                        <option>To do</option>
                        <option>Doing</option>
                        <option>Done</option>
                    </select>
                </label>

                <button type="submit">Aggiungi Task</button>
            </form>
        </>
    );
}

export default AddTask;