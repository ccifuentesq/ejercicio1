
import './App.css';
import { Mantenedor } from './components/Mantenedor';

function App() {
  return (
    <div className="wrapper">
    <h3>Lista de Tareas</h3>
    <div className="form-and-todo-box">
      <Mantenedor/>
    </div>
  </div>
  );
}

export default App;
