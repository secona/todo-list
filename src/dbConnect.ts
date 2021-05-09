import mongoose from 'mongoose';
require('dotenv').config();

export default function dbConnect() {
  return mongoose.connect(process.env.MONGODB_URI!, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
}
