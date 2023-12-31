import mongo from "mongoose"

const {model, Schema} = mongo

// Schema for Users of the Food Delivery Platform 
const schema = Schema({
    
    Name:{
        type: String,
        required: true
    },

    Email:{
        type: String,
        required: true,
        unique: true
    },

    Telephone:{
        type: String,
        required: true,
        maxLength: 10
    },

    Password:{
        type: String,
        required: true
    }

}, {timestamps: true})

// creating and exporting Db Model...
export const UserModel = model("Users", schema)