import {UserModel} from "../Models/Users.js"
import {ResturantModel} from "../Models/Restaurants.js"
import {OrderModel} from "../Models/Order.js"
import {MenuModel} from "../Models/Menu.js"
import {FulfillmentModel} from "../Models/Fulfilment.js"

export const resolvers = {
    Query:{
        welcome: () => 'GraphQl server is up!',

        Users: () => 
            UserModel.find({}).then((doc)=>{
                return doc
            }).catch((err) => {
                return {
                    code: 400,
                    message: err.message
                }
            }),

        UserInfo: (_, {userId}) => UserModel.findById(userId).then((doc)=>{
            return doc
        },).catch((err) => {
            return {
                code: 400,
                message: err.message
            }
        }),

        Resturants: () => ResturantModel.find({}).then((doc) =>{
            return doc
        }).catch((err) => {
            return {
                code: 400,
                message: err.message
            }
        }),

        ResturantInfo: (_, {userId}) => ResturantModel.findById(userId).then((doc)=>{
            return doc
        },).catch((err) => {
            return {
                code: 400,
                message: err.message
            }
        }),

        ResturantMenu: (_,{resturantId}) => ResturantModel.find({Resturant :resturantId}).then((doc)=>{
            return doc
        }).catch((err) => {
            return {
                code: 400,
                message: err.message
            }
        })
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
        },

        AddToMenu: async (_, args) => {
            try{
                const file = new MenuModel(args.MealData)
                await file.save()
                return {
                    code: 200,
                    message: "Meal added to Menu!"
                }
            }
            catch (err) {
                console.log(err)
                return{
                    code: 400,
                    message: "Unable to add Meal to Menu!"
                }
            }
        }
    }
}