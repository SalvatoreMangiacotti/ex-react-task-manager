// Hooks
import React from "react";
import { Link } from "react-router-dom";

function TaskRow({ task }) {

    const checkStatus = (status) => {
        return status === "To do" ? "red" : status === "Doing" ? "yellow" : status === "Done" ? "green" : "";
    }

    return (
        <tr>
            <th><Link to={`/task/${task.id}`}>{task.title}</Link></th>

            <th className={checkStatus(task.status)}>
                {task.status}
            </th>

            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    );
}

export default React.memo(TaskRow);