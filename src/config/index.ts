import { config } from 'dotenv';

const { parsed } = config();

export const {SESSION_SECRET, DB, PORT, PROD, SECRET, IN_PROD = PROD === 'prod', BASE_URL = `http://localhost:${PORT}` } = parsed;
