const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: {type: String, unique: true, required: true},
    email: {type: String, required: true, unique: true},
    session: {type: String},
    sso: {type: Boolean},
    firstName: {type: String},
    lastName: {type: String},
    username: {type: String, unique: true},
    password: {type: String},
    displayName: {type: String},
    photos: {type: Object},
  });
  
const User = new mongoose.model('User', userSchema);
export default User;