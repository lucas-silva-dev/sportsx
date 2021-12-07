import { Dispatch, SetStateAction } from 'react';
import ReactModal from 'react-modal';

import './styles.scss';

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

type ModalProps = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  user?: User;
};

ReactModal.setAppElement('#root');

export function Modal({ showModal, setShowModal, user }: ModalProps) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
    },
  };

  return (
    <ReactModal style={customStyles} isOpen={showModal}>
      <div className='modal'>
        <header>
          <h2>Cliente</h2>
          <button onClick={() => setShowModal(false)}>X</button>
        </header>

        <section className='data-client'>
          <h3>Dados</h3>
          <label>
            CPF / CNPJ
            <input name='cpf_cnpj' value={user?.cpf_cnpj} readOnly />
          </label>
          <label>
            NOME / RAZÃO SOCIAL
            <input name='name' value={user?.name} readOnly />
          </label>
          <label>
            E-MAIL
            <input name='email' value={user?.email} readOnly />
          </label>
          <label>
            CLASSIFICAÇÃO
            <input
              name='classification'
              value={user?.classification}
              readOnly
            />
          </label>
          <label>
            TELEFONES
            <div className='phones'>
              {user?.phones?.map((phone, index) => (
                <input key={index} name='phones' value={phone} readOnly />
              ))}
            </div>
          </label>

          <h4>Endereço</h4>
          <div className='group'>
            <label>
              CEP
              <input name='zipcode' value={user?.address.zipcode} readOnly />
            </label>
            <label>
              ESTADO
              <input name='state' value={user?.address.state} readOnly />
            </label>
          </div>
          <div className='group'>
            <label>
              CIDADE
              <input name='city' value={user?.address.city} readOnly />
            </label>
            <label>
              BAIRRO
              <input
                name='neighborhood'
                value={user?.address.neighborhood}
                readOnly
              />
            </label>
          </div>
          <div className='group'>
            <label>
              RUA
              <input name='street' value={user?.address.street} readOnly />
            </label>
            <label>
              N°
              <input name='number' value={user?.address.number} readOnly />
            </label>
          </div>
        </section>
      </div>
    </ReactModal>
  );
}
