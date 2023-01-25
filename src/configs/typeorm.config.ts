import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
require('dotenv').config();

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'book-curation',
  entities: [join(__dirname, '/../**/*.entity.{js,ts}')],
  synchronize: true,
  ssl: true,
};
