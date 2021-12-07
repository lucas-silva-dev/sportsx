- Instale as dependências com _yarn_ ou _npm_:

```sh
$ yarn install
$ npm install
```

- Inicialize os serviços:

```js
// o banco de dados:
$ npx knex migrate:latest --knexfile knexfile.ts migrate:latest

// inicie o servidor:

$ yarn dev
 //ou //
$ npm run dev
```
