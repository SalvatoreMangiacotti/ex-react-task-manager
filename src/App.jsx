// Hooks
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';

// Componenti
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import TaskDetails from './pages/TaskDetails';
import DefaultLayout from './layouts/DefaultLayout';

// CSS
import './App.css';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<TaskList />} />
            <Route path="/addtask" element={<AddTask />} />
            <Route path="/task/:id" element={<TaskDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider >
  );
}

export default App;