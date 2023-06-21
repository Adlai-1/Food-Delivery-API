import mongo from "mongoose"

const {model, Schema} = mongo

/* Schema for Food Order Details*/
const schema = Schema({

    _id: Schema.Types.ObjectId,

    User:{type: Schema.Types.ObjectId, ref: 'Users'},

    Resturant:{type: Schema.Types.ObjectId, ref: 'Resturants'},

    OrderedMeal: { type: String },

    Price: { type: String }

}, {timestamps: true})
