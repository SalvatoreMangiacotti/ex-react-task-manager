import { useContext, useState, useMemo, useCallback } from "react";
import GlobalContext from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";


function TaskList() {

    // Lista dei task dal contesto globale
    const { tasks } = useContext(GlobalContext);

    // Stati per ordinamento campo e direzione (1 crescente, -1 decrescente)
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState(1);
    const sortIcon = sortOrder === 1 ? "▼" : "▲";

    // Stato controllato per input ricerca (aggiornamento immediato)
    const [searchInput, setSearchInput] = useState("");

    // Stato per query di ricerca "debounced", aggiornato con ritardo per ottimizzazione
    const [searchQuery, setSearchQuery] = useState("");



    // Funzione debounce per ritardare l'aggiornamento della query di ricerca
    const debounce = useCallback((callback, delay) => {
        let timer;
        return (value) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                callback(value);
            }, delay);
        };
    }, []);

    // Aggiorna searchQuery con 300ms di ritardo
    const debouncedSetSearchQuery = useCallback(
        debounce((value) => {
            setSearchQuery(value);
        }, 300),
        [debounce]
    );



    // Aggiorna lo stato degli input e chiama il debounce per la query
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);
        debouncedSetSearchQuery(value);
    };



    // Cambia campo o inverte direzione
    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder((prev) => prev * -1);
        } else {
            setSortBy(field);
            setSortOrder(1);
        }
    };



    // Memo per filtrare e ordinare i task in base a searchQuery, sortBy, sortOrder
    const sortedTasks = useMemo(() => {

        // Ordine default
        const statusOrder = ["To do", "Doing", "Done"];

        // Filtra case insensitive sulla query di ricerca debounced
        const filtered = tasks.filter((task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Ordina la lista filtrata in base al campo e all’ordine selezionato
        return filtered.sort((a, b) => {
            let valueA = a[sortBy];
            let valueB = b[sortBy];

            if (sortBy === "status") {
                valueA = statusOrder.indexOf(valueA);
                valueB = statusOrder.indexOf(valueB);
            }

            else if (sortBy === "createdAt") {
                valueA = new Date(valueA).getTime();
                valueB = new Date(valueB).getTime();
            }

            else if (sortBy === "title") {
                return valueA.localeCompare(valueB) * sortOrder;
            }

            return (valueA - valueB) * sortOrder;
        });
    }, [tasks, sortBy, sortOrder, searchQuery]);

    return (
        <>
            <h2>Lista Tasks</h2>

            {/* Input di ricerca controllato con debounce per filtrare i task */}
            <input
                type="text"
                placeholder="Cerca per titolo..."
                value={searchInput}
                onChange={handleSearchChange}
                style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
            />

            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort("title")}>Nome {sortBy === "title" && sortIcon}</th>
                        <th onClick={() => handleSort("status")}>Stato {sortBy === "status" && sortIcon}</th>
                        <th onClick={() => handleSort("createdAt")}>Data di creazione {sortBy === "createdAt" && sortIcon}</th>
                    </tr>
                </thead>

                <tbody>
                    {sortedTasks.map((task) => (
                        <TaskRow key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default TaskList;