import { Router } from "express";
import { OrderModel } from "../Models/Order.js";
import jsonwebtoken from "jsonwebtoken";

export const OrderRouter = Router();

// Middleware specific to this Router
OrderRouter.use((req, res, next) => {
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

// Endpoint used to create Orders...
OrderRouter.post('/create', async (req, res) => {
  try {
    const file = OrderModel(req.body);
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
});

// Endpoint used to track an Order's status...
OrderRouter.get('/status/:orderId', (req, res) => {
  OrderModel.find({ _id: req.params.orderId })
    .then((doc) => {
      res.json({
        PackageEnroute: doc[0].Enroute,
        PackageDelivered: doc[0].PaidAndDelivered
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Couldn't find what you wanted.",
        error: err.message
      });
    });
});

OrderRouter.get('/info/:orderId', (req, res) => {
  OrderModel.find({ _id: req.params.orderId }).
    populate("User", "Name").
    populate("Resturant", "Name").
    then((doc) => {
      res.status(200).json({
        data: doc
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Couldn't find what you wanted.",
        error: err.message
      });
    });
});
