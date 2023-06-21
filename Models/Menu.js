import mongo from "mongoose"

const {model, Schema} = mongo

// Schema for Food Menus
const schema = Schema({

    Resturant:{type: Schema.Types.ObjectId, ref: 'Resturants'},

    Meal:{
        type: String,
        required: true
    },

    Price:{
        type: String,
        required: true
    }

}, {timestamps: true})

// creating and exporting Db Model...
export const MenuModel = model("Menus", schema)
