const mongoose = require("mongoose")
const Schema = mongoose.Schema
const UserSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, require: true, enum: ["admin", "client"], default: "client" },
    exercise: { type: Schema.Types.ObjectId, ref: "Exercise" },

},
    { collection: "users" });

const Users = mongoose.model("users", UserSchema)
module.exports = Users