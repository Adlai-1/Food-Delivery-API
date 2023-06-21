import mongo from "mongoose"

const {model, Schema} = mongo

// Schema for Food Order Details
const schema = Schema({

    _id: Schema.Types.ObjectId,

    User:{ type: Schema.Types.ObjectId, ref: 'Resturants' },

    Order:{ type: Schema.Types.ObjectId, ref: 'Order' },

    PayedFor:{
        type: Boolean,
        default: false,
        required: true
    },

    DeliveredTo:{
        type: Boolean,
        default: false,
        required: true
    }

}, {timestamps: true})

// creating and exporting Db Model...
export const FulfillmentModel = model("FulfillmentOrders", schema)