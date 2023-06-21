import mongo from "mongoose"

const {model, Schema} = mongo

// Schema for Food Order Details
const schema = Schema({

    User:{type: Schema.Types.ObjectId, ref: 'Users'},

    Resturant:{type: Schema.Types.ObjectId, ref: 'Resturants'},

    Meal: { type: String },

    Price: { type: String }

}, {timestamps: true})

// creating and exporting Db Model...
export const OrderModel = model("Orders", schema)