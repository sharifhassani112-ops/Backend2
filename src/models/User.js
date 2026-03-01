import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  fullName: {
    Types: String,
    required: true,
  },
  email: {
    Types: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  password: {
    Types: String,
    required: true,
    minlength: 6,
  },
});
const User = mongoose.model("User", userSchema);
export default User;
