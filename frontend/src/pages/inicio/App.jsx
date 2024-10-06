import './App.scss';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="pagina-inicio">
        <div className='titulo'>
          <h2>Escolha o que deseja gerenciar</h2>
        </div>
        <div className='lista'>
          <ul>
            <li><Link to="/canal" className='link'>Canais</Link></li>
            <li><Link to="/programa" className='link'>Programas</Link></li>
            <li><Link to="/programafav" className='link'>Programas favoritos</Link></li>
            <li><Link to="/usuario" className='link'>Usuários</Link></li>
          </ul>
        </div>
    </div>
  );
}

export default App;
