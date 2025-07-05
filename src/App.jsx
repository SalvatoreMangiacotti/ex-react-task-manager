// Hooks
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';

// Componenti
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/tasklist" element={<TaskList />} />
          <Route path="/addtask" element={<AddTask />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;