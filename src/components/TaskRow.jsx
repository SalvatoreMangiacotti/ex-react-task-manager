// Hooks
import React from "react";
import { Link } from "react-router-dom";

function TaskRow({ task }) {

    const statusClassName = task.status.replace(" ", "").toLowerCase();

    return (
        <tr>
            <td><Link to={`/task/${task.id}`}>{task.title}</Link></td>

            <td className={statusClassName}>
                {task.status}
            </td>

            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    );
}

export default React.memo(TaskRow);