import mongoose, { Schema, model, Document } from 'mongoose';

export interface userIntraface extends Document {
 name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const userSchema = new Schema<userIntraface>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  }
);


const User = model<userIntraface>('User', userSchema);

export default User;
