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
OrderRouter.post('/create/order', async (request, response) => {
  try {
    const file = OrderModel(request.body);
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
});

// Endpoint used to track an Order's status...
OrderRouter.get('/order/status/:orderId', (request, response) => {
  OrderModel.find({ _id: request.params.orderId })
    .then((doc) => {
      response.json({
        PackageEnroute: doc[0].Enroute,
        PackageDelivered: doc[0].PaidAndDelivered
      });
    })
    .catch((err) => {
      response.status(404).json({
        message: "Couldn't find what you wanted.",
        error: err.message
      });
    });
});

OrderRouter.get('/order/info/:orderId', (request, response) => {
  OrderModel.find({ _id: request.params.orderId }).
    populate("User", "Name").
    populate("Restaurant", "Name").
    then((doc) => {
      response.status(200).json({
        data: doc
      });
    })
    .catch((err) => {
      response.status(404).json({
        message: "Couldn't find what you wanted.",
        error: err.message
      });
    });
});
