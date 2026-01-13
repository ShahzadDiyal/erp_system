import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";
import app from "./src/app"
import { connectDatabase } from "./src/config/database"

const PORT = process.env.PORT || 5000;

async function bootstrap() {
    try {
        await connectDatabase();

        const server = createServer(app);

        server.listen(PORT, () => {
            console.log(`ERP Backend started... at PORT: ${PORT}!`)
        })


    } catch (error) {
        console.error("error starting the server.. error in index.ts", error);
        process.exit(1);
    }
}

bootstrap()