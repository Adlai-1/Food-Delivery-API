import { Router } from "express"
import { ResturantModel } from "../Models/Restaurants.js"
import jsonwebtoken from "jsonwebtoken"

export const ResturantRouter = Router()

// Middleware specific to this Router
ResturantRouter.use((req, res, next) => {
    const authHeader = req.headers['authorization'];
  
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) {
      return res.status(401).json({ message: "Access Denied!" });
    } else {
      jsonwebtoken.verify(token, process.env.SECRETKEY, (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Token Verification Failed!" });
        }
        // Store the user object in the request for future use, if needed
        req.user = user;
        next();
      });
    }
});

// Endpoint to retrieve all Resturants in the Db...
ResturantRouter.get('/all' ,(req, res) => {
    ResturantModel.find({})
    .then((doc) => {
        res.status(200).json({
            data: doc
        })
    })
    .catch((err) =>{
        res.status(404).json({
            message: "Couldn't find what you wanted.",
            error: err.message
        });
    })
})

// Endpoint to get info linked to a Resturant...
ResturantRouter.get('/:resturantId', (req, res) => {
    ResturantModel.findById(req.params.resturantId)
    .then((doc) =>{
        res.status(200).json({
            data: doc
        })
    })
    .catch((err) =>{
        res.status(404).json({
            message: "Couldn't find what you wanted.",
            error: err.message
        });
    })
})