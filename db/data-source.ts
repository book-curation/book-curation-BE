import { DataSource, DataSourceOptions } from "typeorm"
require("dotenv").config();

export const dataSoureOptions: DataSourceOptions = {
    type: "postgres",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "curation",
  entities: ['dist/**/*.entity.js'],
  ssl: true,
  migrations: ['dist/db/migrations/*.js']

}

const dataSource = new DataSource(dataSoureOptions);

export default dataSource;