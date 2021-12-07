import axios from 'axios';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { Link } from 'react-router-dom';
import { CustomerItem } from '../../components/CustomerItem';
import { Modal } from '../../components/Modal';

import filterImg from '../../assets/images/filtro.svg';

import './styles.scss';

// import { Button } from '../../components/Button';

type User = {
  id: number;
  name: string;
  email: string;
  cpf_cnpj?: string;
  cpf?: string;
  cnpj?: string;
  classification: string;
  address: {
    zipcode?: string;
    state?: string;
    city?: string;
    neighborhood?: string;
    street?: string;
    number?: string;
  };
  phones?: string[];
};

export function Customer() {
  const [users, setUsers] = useState<User[]>();
  const [defaultUsers, setDefaultUsers] = useState<User[]>();
  const [cpf, setCpf] = useState<User[]>();
  const [cnpj, setCnpj] = useState<User[]>();

  const [modalUser, setModalUser] = useState<User>();

  const [hasClickedCpf, setHasClickedCpf] = useState(false);
  const [hasClickedCnpj, setHasClickedCnpj] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [typeUser, setTypeUser] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get<User[]>('http://localhost:3333/users');

        setUsers(data);
        setDefaultUsers(data);
        const cpf = data.filter((d) => d.cpf_cnpj && d.cpf_cnpj?.length === 14);
        setCpf(cpf);

        const cnpj = data.filter((d) => d.cpf_cnpj && d.cpf_cnpj?.length > 14);
        setCnpj(cnpj);
      } catch (err) {
        toast.error('Erro ao buscar os dados no servidor');
      }
    }

    getData();
  }, []);

  function handleFilter(type: string) {
    if (type === typeUser) {
      setTypeUser('default');
    } else {
      setTypeUser(type);
    }
  }

  useEffect(() => {
    switch (typeUser) {
      case 'cpf':
        setUsers(cpf);

        setHasClickedCnpj(false);
        break;
      case 'cnpj':
        setUsers(cnpj);

        setHasClickedCpf(false);
        break;

      default:
        setUsers(defaultUsers);

        setHasClickedCpf(false);
        setHasClickedCnpj(false);
        break;
    }
  }, [cnpj, cpf, defaultUsers, hasClickedCnpj, hasClickedCpf, typeUser, users]);

  function setModalState(user: User) {
    setModalUser(user);
    setShowModal(true);
  }

  return (
    <div className='customers-page'>
      <Toaster />
      <main>
        <div className='header'>
          <h1>Clientes</h1>

          <Link
            to='/'
            aria-label='voltar para a Home'
            title='Voltar para a Home'
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M15.8332 10H4.1665'
                stroke='#3782c7'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M9.99984 15.8333L4.1665 10L9.99984 4.16667'
                stroke='#3782c7'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </Link>
        </div>

        <div className='glossary-list  grid-list'>
          <p className='grid _1'>
            <button
              title='Filtrar por CPF'
              className={`${hasClickedCpf ? 'clicked' : ''}`}
              onClick={() => {
                setHasClickedCpf(!hasClickedCpf);
                handleFilter('cpf');
              }}
            >
              CPF
            </button>
            {'  '} / {'  '}
            <button
              title='Filtrar por CNPJ'
              className={`${hasClickedCnpj ? 'clicked' : ''}`}
              onClick={() => {
                setHasClickedCnpj(!hasClickedCnpj);
                handleFilter('cnpj');
              }}
            >
              CNPJ
            </button>
            <img src={filterImg} alt='ícone de filtro' />
          </p>
          <p className='grid _2'>Nome</p>
          <p className='grid _3'>Email</p>
          <p className='grid _4'>Telefones</p>
          <p className='grid _5'>Classificação</p>
        </div>

        <ul>
          {users?.map((user) => {
            return (
              <CustomerItem key={user.id} onClick={() => setModalState(user)}>
                <strong className='grid _1'>{user.cpf_cnpj}</strong>
                <strong className='grid _2'>{user.name}</strong>
                <strong className='grid _3'>{user.email}</strong>
                <strong className='grid _4'>{user.phones?.join(', ')}</strong>
                <strong className='grid _5'>{user.classification}</strong>
              </CustomerItem>
            );
          })}
        </ul>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          user={modalUser}
        />
      </main>
    </div>
  );
}
