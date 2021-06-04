import mongoose from 'mongoose';
import { MONGODB_URI } from './constants/env';

export default function dbConnect() {
  return mongoose.connect(MONGODB_URI as string, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
}
