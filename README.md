## Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- React
- Typescript
- Node.js
- Sass
- Sqlite
- Express.js

## Bibliotecas

- [React Select](https://react-select.com/home)
- [Unform](https://unform.dev/)
- [React Hot Toast](https://react-hot-toast.com/)
- [Yup](https://github.com/jquense/yup)
- [Knex](https://knexjs.org/)
- [Cors](https://github.com/expressjs/cors)

## Projeto

SportsX é uma aplicação de cadastro e listagem de clientes.

## Instalação

_Teste realizado utilizando o NodeJs (versão 14.5) _

#### Para executar o projeto siga os passos:

- Instalar o Node caso não tenha
- Fazer o clone do repositório:

```sh
git clone https://github.com/lucas-silva-dev/sportsx.git
```

- Entre no projeto:

```sh
cd sportsx
```

### Para rodar o backend

#### entre na pasta:

```sh
cd backend/
```

- Instale as dependências com _yarn_ ou _npm_:

```sh
yarn install
npm install
```

- Inicialize os serviços:

```js
// o banco de dados:
$ npx knex migrate:latest --knexfile knexfile.ts migrate:latest

// inicie o servidor:

yarn dev
 //ou //
npm run dev
```

### Para rodar o frontend

#### entre na pasta:

```sh
cd frontend/
```

- Instale as dependências com _yarn_ ou _npm_:

```sh
yarn install
npm install
```

- Inicialize o Front

```js
yarn start
 //ou //
npm start
```

Se tudo ocorrer bem, o projeto vai abrir por padrão em:

```sh
http://localhost:3000/
```

Caso a porta esteja ocupada, vai buscar a próxima porta disponível a partir da 3001, 3002, 3003...
