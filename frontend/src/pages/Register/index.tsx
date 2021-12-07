import { FormHandles, Scope, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { useRef, useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { mask, maskTel, maskZipcode } from '../../utils/masks';

import './styles.scss';

import { Toaster, toast } from 'react-hot-toast';

interface FormData {
  name: string;
  email: string;
}

const selectOptions = [
  { value: 'ativo', label: 'Ativo' },
  { value: 'preferencial', label: 'Preferencial' },
  { value: 'inativo', label: 'Inativo' },
];

export function Register() {
  const formRef = useRef<FormHandles>(null);
  const [zipcode, setZipcode] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');

  const [phone, setPhone] = useState('');
  const [phones, setPhones] = useState<string[]>([]);

  let formattedZipcode = zipcode.replaceAll('-', '');

  if (formattedZipcode.trim().length === 8) {
    getAddress(formattedZipcode);
  }

  const inputValue = (value: string) => formRef.current?.getFieldValue(value);
  const setInputValue = (input: string, value: any) =>
    formRef.current?.setFieldValue(input, value);

  async function getAddress(cep: string) {
    try {
      const { data, status } = await axios.get(
        `https://viacep.com.br/ws/${cep}/json/`
      );

      if (status !== 200) {
        alert('This zipcode does not exists!');
        return;
      }

      const address = {
        zipcode: zipcode || inputValue('address.zipcode'),
        state: data.uf || inputValue('address.state'),
        city: data.localidade || inputValue('address.city'),
        neighborhood: data.bairro || inputValue('address.neighborhood'),
        street: data.logradouro || inputValue('address.street'),
        number: inputValue('address.number') || '',
      };

      setInputValue('address.zipcode', zipcode);
      setInputValue('address.state', address.state);
      setInputValue('address.city', address.city);
      setInputValue('address.neighborhood', address.neighborhood);
      setInputValue('address.street', address.street);
      setInputValue('address.number', address.number);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit: SubmitHandler<FormData> = async (data, { reset }) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().max(100, 'Max 100 characters').required(),
        email: Yup.string().email('Enter a valid email address').required(),
        classification: Yup.string().required('Please select a classification'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // Validation passed
      await axios.post('http://localhost:3333/users', data);
      toast.success('Usuário cadastrado com sucesso');

      reset();
    } catch (err) {
      const validationErrors = {} as any;

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          let err = error.path || '';

          validationErrors[err] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      } else {
        toast.error('Email ou CPF / CNPJ já existe no Banco de dados');
      }
    }
  };

  function handleAddPhone() {
    setPhones([...phones, '']);
  }

  function handleRemovePhone(phone: number) {
    setPhones([...phones.filter((_, index) => index !== phone)]);
  }

  return (
    <div className='register-page'>
      <div>
        <Toaster />
      </div>
      <main>
        <div className='header'>
          <h1>Cadastro</h1>
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
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input maxLength={100} name='name' label='Nome / Razão social*' />
          <Input name='email' label='E-mail*' />
          <Input
            name='cpf_cnpj'
            label='CPF / CNPJ'
            maxLength={18}
            onChange={(event) => setCpfCnpj(mask(event.target.value))}
            value={cpfCnpj}
          />

          <Scope path='phones'>
            <div className='input-group'>
              <Input
                name='0'
                label='Telefone'
                maxLength={15}
                onChange={(event) => setPhone(maskTel(event.target.value))}
                value={phone}
              />
              <Button
                title='Adicionar mais telefones'
                type='button'
                onClick={handleAddPhone}
                addBtn
              >
                +
              </Button>
            </div>
            {phones.map((phone, index) => (
              <div key={index} className='input-group'>
                <Input
                  name={`${index + 1}`}
                  label={`Telefone ${index + 2}`}
                  maxLength={15}
                  onChange={(event) => {
                    phones[index] = maskTel(event.currentTarget.value);
                    setPhones([...phones]);
                  }}
                  value={phone}
                />
                <Button
                  type='button'
                  onClick={() => handleRemovePhone(index)}
                  rmBtn
                >
                  <svg
                    width='16'
                    height='22'
                    viewBox='0 0 16 22'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M4 5V3C4 2.46957 4.21071 1.96086 4.58579 1.58579C4.96086 1.21071 5.46957 1 6 1H10C10.5304 1 11.0391 1.21071 11.4142 1.58579C11.7893 1.96086 12 2.46957 12 3V5M15 5V19C15 19.5304 14.7893 20.0391 14.4142 20.4142C14.0391 20.7893 13.5304 21 13 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V5H15Z'
                      stroke='#737380'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </Button>
              </div>
            ))}
          </Scope>
          <Scope path='address'>
            <div className='input-group'>
              <Input
                name='zipcode'
                label='CEP'
                maxLength={10}
                onChange={(event) =>
                  setZipcode(maskZipcode(event?.target.value))
                }
              />
              <Input name='state' label='Estado' />
            </div>
            <div className='input-group'>
              <Input name='city' label='Cidade' />
              <Input name='neighborhood' label='Bairro' />
            </div>
            <div className='input-group'>
              <Input name='street' label='Rua' />
              <Input name='number' label='N°' />
            </div>
          </Scope>

          <Select
            name='classification'
            label='Classificação*'
            options={selectOptions}
          />

          <Button type='submit'>Cadastrar</Button>
        </Form>
      </main>
    </div>
  );
}
