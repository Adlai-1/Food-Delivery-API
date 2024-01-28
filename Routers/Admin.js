import { Router } from "express"
import { ResturantModel } from "../Models/Restaurants.js"
import { MenuModel } from "../Models/Menu.js"
import jsonwebtoken from "jsonwebtoken"

export const AdminRouter = Router()

// Middleware specific to this Router
AdminRouter.use((req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ status: 401, message: "Access Denied!" });
    } else {
        jsonwebtoken.verify(token, process.env.ADMIN_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ status: 403, message: "Token Verification Failed!" });
            }
            // Store the user object in the request for future use, if needed
            req.user = user;
            next();
        });
    }
});

// Endpoint for adding new Resturants
AdminRouter.post('/add/resturant', async (req, res) => {
    try {
        const file = ResturantModel(req.body);
        await file.save();
        res.status(200).json({
            message: "Resturant created!"
        });
    } catch (err) {
        res.status(400).json({
            message: "Couldn't create new Resturant",
            error: err.message
        });
    }
})

//Endpoint for adding new Food dishes
AdminRouter.post('/add/menu/', async (req, res) => {
    try {
        const file = MenuModel(req.body);
        await file.save();
        res.status(200).json({
            message: "Order created!"
        });
    } catch (err) {
        res.status(400).json({
            message: "Couldn't create Order",
            error: err.message
        });
    }
})
