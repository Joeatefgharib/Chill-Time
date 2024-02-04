import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
});

const Login = mongoose.model('users', LoginSchema);

export default Login;
