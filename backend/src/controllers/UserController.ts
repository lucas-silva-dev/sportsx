import { Request, Response } from 'express';
import knex from '../database/connection';

import database from '../database/connection';

type User = {
  name: string;
  email: string;
  cpf_cnpj?: string;
  classification: string;
  phones?: string[];
  address: {
    zipcode?: string;
    state?: string;
    city?: string;
    neighborhood?: string;
    street?: string;
    number?: string;
  };
};

class UserController {
  async create(request: Request, response: Response) {
    const { name, email, cpf_cnpj, classification, phones, address }: User =
      request.body;

    if (!name || !email || !classification) {
      return response.json({
        error: 'Required fields are blank or undefined',
      });
    }

    const emailAlreadyExists = await database
      .select('u.email')
      .from('users as u')
      .where('u.email', email)
      .first();

    const cpfCnpjAlreadyExists = await database
      .select('u.cpf_cnpj')
      .from('users as u')
      .where('u.cpf_cnpj', cpf_cnpj)
      .first();

    if (emailAlreadyExists) {
      response.statusMessage = 'This e-mail already exists';
      return response.status(409).json({
        error: 'This e-mail already exists',
      });
    }

    if (cpfCnpjAlreadyExists) {
      response.statusMessage = 'This CPF / CNPJ already exists';
      return response.status(409).json({
        error: 'This CPF / CNPJ already exists',
      });
    }

    try {
      const trx = await knex.transaction();

      const user = {
        name,
        email,
        cpf_cnpj,
        classification,
        zipcode: address.zipcode,
        state: address.state,
        city: address.city,
        neighborhood: address.neighborhood,
        street: address.street,
        number: address.number,
      };

      const insertedUserIds = await trx('users').insert(user);
      const user_id = insertedUserIds[0];

      await trx('contacts').insert({ phones, user_id });

      await trx.commit();

      return response.status(201).send();
    } catch (error) {
      response.send(error);
    }
  }

  async index(request: Request, response: Response) {
    const users = await database
      .select('u.*', 'c.phones')
      .from('users as u')
      .join('contacts as c', 'u.id', 'c.user_id');

    const serializedUser = users.map((user, index) => {
      let serializedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        cpf_cnpj: user.cpf_cnpj,
        classification: user.classification,
        address: {
          zipcode: user.zipcode,
          state: user.state,
          city: user.city,
          neighborhood: user.neighborhood,
          street: user.street,
          number: user.number,
        },
        phones: user.phones.split(','),
      };

      return serializedUser;
    });

    response.status(200).json(serializedUser);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const user = await database('users as u')
      .where('u.id', id)
      .join('contacts as c', 'u.id', 'c.user_id')
      .select('u.*', 'c.phones')
      .first();

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    const phones = user.phones.split(',');

    return response.json({ ...user, phones });
  }
}

export { UserController };
