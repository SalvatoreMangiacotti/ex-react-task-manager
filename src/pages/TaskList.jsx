// Hooks
import { useContext, useState, useMemo } from "react";

// Componenti
import GlobalContext from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";

function TaskList() {

    const { tasks } = useContext(GlobalContext);

    // State per l'ordinamento delle task
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState(1); // (1 per crescente, -1 per decrescente).


    // Cambia ordinamento
    const handleSort = (field) => {
        if (sortBy === field) {
            // Se clicchi lo stesso campo, inverte la direzione
            setSortOrder(prev => prev * -1);
        } else {
            setSortBy(field);
            setSortOrder(1);
        }
    };

    // sortBy e sortOrder
    const sortedTasks = useMemo(() => {
        // Ordine predefinito
        const statusOrder = ["To do", "Doing", "Done"];

        // Ritorna una nuova lista ordinata
        return [...tasks].sort((a, b) => {
            // sortBy estrae i valori da confrontare in base al campo selezionato
            let valueA = a[sortBy];
            let valueB = b[sortBy];

            // Se si ordina per "status" gli indici vengono convertiti
            if (sortBy === "status") {
                valueA = statusOrder.indexOf(valueA);
                valueB = statusOrder.indexOf(valueB);
            }

            // Se si ordina per "createdAt" le date vengono convertite in timeStamp
            if (sortBy === "createdAt") {
                valueA = new Date(valueA).getTime();
                valueB = new Date(valueB).getTime();
            }

            // Ordinamento per ordine alfabetico
            if (typeof valueA === "string") {
                return valueA.localeCompare(valueB) * sortOrder;
            }

            // Per numeri o date, ordine crescente o decrescente
            return (valueA - valueB) * sortOrder;
        });
    }, [tasks, sortBy, sortOrder]); // Ricalcola solo se cambiano tasks o ordinamento

    return (
        <>
            <h2>Lista Tasks</h2>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort("title")}>Titolo</th>
                        <th onClick={() => handleSort("status")}>Stato</th>
                        <th onClick={() => handleSort("createdAt")}>Data di creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTasks.map(task =>
                        <TaskRow key={task.id} task={task} />
                    )}
                </tbody>
            </table>
        </>
    );
}

export default TaskList;