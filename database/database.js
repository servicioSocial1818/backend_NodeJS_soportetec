import Sequelize from 'sequelize';
import * as dotenv from 'dotenv'
dotenv.config()

export const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.SECRET, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})