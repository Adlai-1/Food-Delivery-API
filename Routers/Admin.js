import { Router } from "express"
import { ResturantModel } from "../Models/Restaurants.js"
import { MenuModel } from "../Models/Menu.js"


export const AdminRouter = Router()

AdminRouter.post('/add/resturant', async (req, res) => {
    try {
        const file = ResturantModel(req.body);
        await file.save();
        response.status(200).json({
            message: "Order created!"
        });
    } catch (err) {
        response.status(400).json({
            message: "Couldn't create Order",
            error: err.message
        });
    }
})

AdminRouter.post('/add/menu/', async (req, res) => {
    try {
        const file = MenuModel(req.body);
        await file.save();
        response.status(200).json({
            message: "Order created!"
        });
    } catch (err) {
        response.status(400).json({
            message: "Couldn't create Order",
            error: err.message
        });
    }
})