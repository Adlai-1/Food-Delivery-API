import mongo from "mongoose"

const {model, Schema} = mongo

// Schema for Resturants of the Food Delivery Platform 
const schema = Schema({
    _id: Schema.Types.ObjectId,

    Name:{
        type: String,
        required: true
    },

    Telephone:{
        type: String,
        required: true,
        maxLength: 10
    },

    City:{
        type: String,
        required: true
    },

    Address:{
        type: String,
        required: true
    },

    Description:{
        type: String,
        require: true
    }

}, {timestamps: true})

// creating and exporting Db Model...
export const ResturantModel = model("Resturants", schema)