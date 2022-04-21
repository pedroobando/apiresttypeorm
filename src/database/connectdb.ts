import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { NODE_ENV } from '../helpers/cf-enviroment';
// export const connectdb = () => {};

export const connectdb = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [User],
  subscribers: [],
  migrations: [],
  synchronize: true,
  logging: NODE_ENV === 'development' ? true : false,
});
