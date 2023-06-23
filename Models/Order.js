import mongo from "mongoose"

const {model, Schema} = mongo

// Schema for Food Order Details
const schema = Schema({

    User: { 
        type: Schema.Types.ObjectId, 
        ref: 'Users'
    },

    Resturant: { 
        type: Schema.Types.ObjectId, 
        ref: 'Resturants'
    },

    Meal: { 
        type: String,
        required: true 
    },

    Price: { 
        type: String,
        required: true
    },

    Enroute: {
        type: Boolean,
        required: true,
        default: false
    },

    PaidAndDelivered: {
        type: Boolean,
        required: true,
        default: false
    }

}, {timestamps: true})

// creating and exporting Db Model...
export const OrderModel = model("Orders", schema)