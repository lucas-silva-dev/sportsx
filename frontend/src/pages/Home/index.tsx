import { Link } from 'react-router-dom';
import logo from '../../assets/images/SportsX.png';

// import { Button } from '../../components/Button';

import './styles.scss';

export function Home() {
  return (
    <div className='home-page'>
      <main>
        <img src={logo} alt='Logo SportsX' />

        <Link className='link button' to='/customers/new'>
          Cadastrar cliente
        </Link>
        <Link className='button' to='/customers/'>
          Listar clientes
        </Link>
      </main>
    </div>
  );
}
