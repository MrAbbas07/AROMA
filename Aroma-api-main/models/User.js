const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: String,
    college: String,
    phone: String,
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel