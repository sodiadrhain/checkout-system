import { connect, connection, disconnect } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoServer = async () => {
  return await MongoMemoryServer.create();
};
export const connectDb = async () => {
  await connect(await mongoServer().then((server) => server.getUri()), { dbName: 'checkoutSystem' });
};

export const closeDb = async () => {
  await mongoServer().then(async (server) => await server.stop());
  await connection.close();
  await disconnect();
};

export const clearDb = async () => {
  const collections = connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await connection.dropCollection(`${collection}`);
  }
  await connection.dropDatabase();
};
