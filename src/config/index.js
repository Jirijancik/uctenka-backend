import { config } from 'dotenv';

const { parsed } = config();

export const { PORT, DB } = parsed;
