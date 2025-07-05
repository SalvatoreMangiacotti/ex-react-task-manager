// Hooks
import React from "react";

function TaskRow({ task }) {

    console.log(`Rendering TaskRow: ${task.id}`);

    const checkStatus = (status) => {
        return status === "To do" ? "red" : status === "Doing" ? "yellow" : status === "Done" ? "green" : "";
    }

    return (
        <tr>
            <th>{task.title}</th>

            <th className={checkStatus(task.status)}>
                {task.status}
            </th>

            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    );
}

export default React.memo(TaskRow);