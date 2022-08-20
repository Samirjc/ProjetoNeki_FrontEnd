import './App.css';
import Context from './context/AuthContext';
import { Rotas } from './routes/rotas';

function App() {
  return (
    <Context>
      <Rotas />
    </Context>
  );
}

export default App;
