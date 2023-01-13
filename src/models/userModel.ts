import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IUser {
  userId: string;
  email: string;
  session: string;
  sso: boolean;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  displayName: string;
  photos: { value: string }[];
}

const userSchema = new Schema<IUser>({
  userId: { type: String, unique: true, required: true },
  email: { type: String, required: true, unique: true },
  session: { type: String },
  sso: { type: Boolean },
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String, unique: true },
  password: { type: String },
  displayName: { type: String },
  photos: [{ value: String }],
});

const User =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model('User', userSchema);

export default User;
