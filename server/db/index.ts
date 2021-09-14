import * as mongoose from 'mongoose';

export const connectDatabase = (uri: string) =>
  new Promise<mongoose.Connection>((resolve, reject) => {
    mongoose.connection
      .on('error', (error) => reject(error))
      .on('close', () => console.log('Database connection closed.'))
      .once('open', () => resolve(mongoose.connections[0]));

    mongoose.connect(uri);
  });
