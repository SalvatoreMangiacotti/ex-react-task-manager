// Hooks
import { useContext } from "react";

// Componenti
import GlobalContext from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";

function TaskList() {
    const { tasks } = useContext(GlobalContext);

    return (
        <>
            <h2>Lista Tasks</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Stato</th>
                        <th>Data di Creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task =>
                        <TaskRow key={task.id} task={task} />
                    )}
                </tbody>
            </table>
        </>
    );
}

export default TaskList;