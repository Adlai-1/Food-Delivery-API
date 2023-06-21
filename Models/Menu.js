import mongo from "mongoose"

const {model, Schema} = mongo

// Schema for Food Menus
const schema = Schema({

    _id: Schema.Types.ObjectId,

    Resturant:{type: Schema.Types.ObjectId, ref: 'Resturants'},

    Menu:[{

        Food: {
            type: String,
            required: true
        },

        Price: {
            type: String,
            required: true
        }
    }]

}, {timestamps: true})

// creating and exporting Db Model...
export const MenuModel = model("Menus", schema)
