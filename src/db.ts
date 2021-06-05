import mongoose from 'mongoose';
import { MONGODB_URI } from './constants/env';

const db = {
  connect: () => {
    return mongoose.connect(MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  },

  close: () => {
    return mongoose.connection.close();
  },

  clearDatabase: async () => {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  },
};

export default db;
