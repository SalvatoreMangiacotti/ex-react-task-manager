// Hooks
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';

// Componenti
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import DefaultLayout from './layouts/DefaultLayout';

// CSS
import './App.css';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/tasklist" element={<TaskList />} />
            <Route path="/addtask" element={<AddTask />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider >
  );
}

export default App;