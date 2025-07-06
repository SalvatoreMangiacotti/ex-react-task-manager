// Hooks
import { useState, useRef, useContext, useMemo } from "react";
import GlobalContext from "../context/GlobalContext";

// Simboli vietati
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

function AddTask() {

    // Custom hook
    const { addTask } = useContext(GlobalContext);

    // Input controllato per il titolo
    const [title, setTitle] = useState("");

    // Ref per textarea e select non controllati    
    const descriptionRef = useRef();
    const statusRef = useRef();


    const taskTitleError = useMemo(() => {
        // Validazione: titolo vuoto
        if (title.trim() === "") {
            return ("Errore: Il titolo non può essere vuoto!");
        }

        // Validazione: simboli vietati
        if ([...title].some(char => symbols.includes(char))) {
            return ("Errore: Il titolo non può contenere simboli speciali!");
        }
        // Reminder:
        // [...title] trasforma la stringa in un array di caratteri.
        // .some() verifica se almeno un carattere è presente in symbols.

    })


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (taskTitleError) {

            return;
        }

        // Oggetto con proprietà della nuova task
        const newTask = {
            title: title.trim(),
            description: descriptionRef.current.value.trim(),
            status: statusRef.current.value,
        };

        try {
            await addTask(newTask);
            alert("Task creata con successo!")
            setTitle("")
            descriptionRef.current.value = ""
            statusRef.current.value = ""
        }
        catch (error) {
            alert(error.message)
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
                {taskTitleError && <p style={{ color: "red" }}>{taskTitleError}</p>}

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