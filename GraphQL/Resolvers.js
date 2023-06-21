import {UserModel} from "../Models/Users.js"
import {ResturantModel} from "../Models/Restaurants.js"
import {OrderModel} from "../Models/Order.js"
import {MenuModel} from "../Models/Menu.js"
import {FulfillmentModel} from "../Models/Fulfilment.js"

export const resolvers = {
    Query:{
        welcome: () => 'GraphQl server is up!'
    },

    Mutation:{
        CreateUser: async (_, args) => {
            try{
                const file = new UserModel(args.UserData)
                await file.save();
                return{
                    code: 200,
                    message: "User credentials created!"
                }
            }
            catch (err) {
                return {
                    code: 400,
                    message: err.message
                }
            }
        },

        AddResturant: async (_, args) => {
            try{
                const file = new ResturantModel(args.ResturantData)
                await file.save();
                return {
                    code: 200,
                    message: "Resturant Added!"
                }
            }
            catch (err) {
                return {
                    code: 400,
                    message: err.message
                }
            }
        }
    }
}