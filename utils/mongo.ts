import config from "config";
import mongoose from "mongoose";
import consola from 'consola';

export async function connectToMongo() {    
    try {
        await mongoose.connect(config.get("DB"))
        consola.success({
            badge: true,
            message: `Successfully connected with the database ${config.get("DB")}`,
          });
    } catch (error) {
        consola.error({
            badge: true,
            message: (error as Error).message,
          });
        process.exit(1)
    }
}