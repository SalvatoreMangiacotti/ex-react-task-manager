// Hooks
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <header>
            <nav className="navbar">
                <NavLink to="/">Task List</NavLink>
                <NavLink to="/addtask">Add Task</NavLink>
            </nav>
        </header>
    );
}

export default Navbar;
