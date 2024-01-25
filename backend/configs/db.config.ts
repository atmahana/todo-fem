import 'dotenv/config';
import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;

export const connectToDB = async () => {
  return new Promise<void>(async(resolve, reject) => {
    try {
      mongoose.Promise = Promise;
      await mongoose.connect(MONGO_URL as string);
      resolve();
    } catch (error) {
      mongoose.connection.on('error', (error: Error) => console.log(error));
      reject();
    }
  })
}