const mongoose= require("mongoose");

const assemblyUserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});

const AssemblyUser = new mongoose.model("AssemblyUser", assemblyUserSchema);
module.exports= AssemblyUser;