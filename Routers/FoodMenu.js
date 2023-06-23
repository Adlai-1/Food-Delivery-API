import { Router } from "express"
import { MenuModel } from "../Models/Menu.js"

export const MenuRouter = Router()

// Middleware specific to this Router
MenuRouter.use((req, res, next) => {
    const authHeader = req.headers['authorization'];
  
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) {
      return res.status(401).json({ status: 401, message: "Access Denied!" });
    } else {
      jsonwebtoken.verify(token, process.env.SECRETKEY, (err, user) => {
        if (err) {
          return res.status(403).json({ status: 403, message: "Token Verification Failed!" });
        }
        // Store the user object in the request for future use, if needed
        req.user = user;
        next();
      });
    }
});


// Endpoint to get a Resturant's food Menu...
MenuRouter.get('/resturant/:resturantId', (req, res) => {
    MenuModel.find({Resturant: request.params.resturantId})
    .populate("Resturant", "Name")
    .then((doc) => {
      res.status(200).json({
        data: doc
      });
    })
    .catch((err) => {
      response.status(404).json({
        message: "Couldn't find what you wanted.",
        error: err.message
      });
    })
})