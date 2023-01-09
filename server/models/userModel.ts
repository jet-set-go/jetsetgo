const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: {type: String, unique: true},
    username: {type: String, unique: true},
    password: {type: String, required: true}
  });
  
const User = new mongoose.model('User', userSchema);
export default User;