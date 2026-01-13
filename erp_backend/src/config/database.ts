import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.DB_NAME || 'erp_db',
    process.env.USER_NAME || 'postgres',
    process.env.PASS || 'shahzad@123',
    {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 5432),
        dialect: 'postgres',
        logging: false
    }
);

export async function connectDatabase(): Promise<void> {
    await sequelize.authenticate();
    console.log("Database connected (Postgress + Sequelize)")
}

export default sequelize;