# About
This is a REST API for a food delivery service.

# Documentation
## The API allows Users to:
* Browse through a list of Resturants.
* Place food orders.
* Handle order fulfillment.
* Create their user profile.
## The API allows Admins to:
* Add new Resturants to the DB.
* Add new menus to the DB.

# Tech Stack
* JavaScript.
* ExpressJs.
* MongoDB.
* Mongoose.
* JsonWebTokens(JWTs).
* argon2.

# Routers
There are 5 routers used in this API:
* '/resturant'
* '/menu'
* '/order'
* '/user'
* '/admin'

# API End-points 

## The welcome End-point.
* Route Path -> '/welcome/:name
* Request URL -> http://localhost:5000/welcome/David
* Expected response -> {"message": "Hello David, welcome to the Food-Delivery-API"}

## The '/user' Router
### '/create' -> Is used to create new Users.
* Route Path -> '/user/create'
* Request URL -> http://localhost:5000/user/create
* Expected Input: {"Name" : "David Nettey",
"Email" : "david@carrot.com",
"Telephone" : "0550903238",
"Password": "Dadlai1" }
* Expected Output: {"message": "User Created!"}
*This is a POST method.*

### '/login' -> Is used to log Users in and provide them with an access token.
* Route Path -> '/user/login'
* Request URL -> http://localhost:5000/user/login
* Expected Input: {"Email" : "david@carrot.com",
"Password": "Dadlai1" }
* Expected Output: {"AuthToken": "fdfdf.dfdfdf.dfdfd"}
*This is a POST method.*

### '/admin/login' -> Is used to log Admin Users in and provide them with an access token.
* Route Path -> '/user/admin/login'
* Request URL -> http://localhost:5000/user/admin/login
* Expected Input: {"Email" : "david@carrot.com",
"Password": "Dadlai1" }
* Expected Output: {"AuthToken": "fdfdf.dfdfdf.dfdfd"}
*This is a POST method.*

## The '/admin' Router
### '/add/resturant' -> Is used to add new resturants to the Resturant collection in our DB.
* Route Path -> '/admin/add/resturant'
* Request URL -> http://localhost:5000/admin/add/resturant
* Expected Input: {"Name": "Kasoa Cusine"
"Telephone": "0550903238"
"City": "Kasoa"
"Address":"House no. 2c Bridge Street"
}
* Expected Output: {"message": "Order created!"}

### '/add/menu' -> Is used to add new food dishes to the Menu collection in our DB.
* Route Path -> '/admin/add/menu'
* Request URL -> http://localhost:5000/admin/add/menu
* Expected Input: {"Resturant": "649bd"
"Meal": "Waakye"
"Price": "Ghc 32.00"
}
**649bd is The resturant ID**
* Expected Output: {"message": "Order created!"}
NB: Both end points are POST methods and require the _Admin_ token access before for a successful request can be made.

## The '/resturant' Router
### '/all' -> return an array list of all Resturants available in the DB.
* Route Path -> '/resturant/all'
* Request URL -> http://localhost:5000/resturant/all
* Expected Input: None
* Expected Output: {
"data": [
{
"_id": "6495d0cbd49cee047c7ec263",
"Name": "Kasoa Cusine",
"Telephone": "0550903238",
"City": "Kasoa",
"Address": "House no. 2c Bridge Street",
"createdAt": "2023-06-23T17:05:15.794Z",
"updatedAt": "2023-06-23T17:05:15.794Z",
"__v": 0
},
{
"_id": "6495d0cbd49cee047c7ec263",
"Name": "Weija Cusine",
"Telephone": "0550903238",
"City": "Weija",
"Address": "House no. 2c Weija Street",
"createdAt": "2023-06-23T17:12:15.794Z",
"updatedAt": "2023-06-23T17:12:15.794Z",
"__v": 0
},
]
}

### '/:resturantId' -> return the details of a Resturant associated to the resturantId.
* Route Path -> '/resturant/23'
* Request URL -> http://localhost:5000/resturant/23
where resturantId = 23
* Expected Input: None
* Expected Output: {
"\_id": "23",
"Name": "Kasoa Cusine",
"Telephone": "0550903238",
"City": "Kasoa",
"Address": "House no. 2c Bridge Street",
"createdAt": "2023-06-23T17:05:15.794Z",
"updatedAt": "2023-06-23T17:05:15.794Z",
"\_\_v": 0
},
NB: Both end points are GET methods and require the _User_ token access before for a successful request can be made.

## The '/menu' Router
### '/resturant/:resturantId' -> returns menu associated with resturantId.
* Route Path -> '/menu/resturant/:resturantId'
* Request URL -> http://localhost:5000/menu/resturant/4b6
where resturantId = 4b6
* Expected Input: None
* Expected Output:{
"data": [
{
"_id": "6495e0592a4bfd79d88bcec2",
"Resturant": {
"_id": "4b6",
"Name": "Kasoa Cusine"
},
"Meal": "Waakye",
"Price": "Ghc 32.00",
"createdAt": "2023-06-23T18:11:37.910Z",
"updatedAt": "2023-06-23T18:11:37.910Z",
"__v": 0
},
]
}
NB: The end point is a GET methods and require the _User_ token access before for a successful request can be made.

## The '/order' Router
### '/create' -> Is used to create a new food order for delivery.
* Route Path -> '/order/create'
* Request URL -> http://localhost:5000/order/create
* Expected Input: {
"User": "6493"
"Resturant": "6495d0"
"Meal": "Waakye"
"Price": "Ghc 40.00"
},
where "6493" is a User's ID and "6495d0" is a Resturant's ID
*Expected Output: {"message": "Order created!"}

### '/order/status/:orderId' -> Is used to check the status of an order.
* Route Path -> '/order/status/:orderId'
* Request URL -> http://localhost:5000/order/status/34
where orderId = 34
* Expected Input: None
* Expected Output: {"PackageEnroute": false,
"PackageDelivered": false}

### '/order/info/:orderId' -> returns info of an order associated with the orderId.
* Route Path -> '/order/info:orderId'
* Request URL -> http://localhost:5000/order/info/34
where orderId = 34
* Expected Input: None
* Expected Output:{
"data": [
{
"_id": "34",
"User": {
"_id": "6495beb036549911d6f1ec7a",
"Name": "David Nettey"
},
"Resturant": {
"_id": "6495d0cbd49cee047c7ec263",
"Name": "Kasoa Cusine"
},
"Meal": "Waakye",
"Price": "Ghc 40.00",
"Enroute": false,
"PaidAndDelivered": false,
"createdAt": "2023-06-23T19:29:26.682Z",
"updatedAt": "2023-06-23T19:29:26.682Z",
"__v": 0
}
]
}
NB: All the above end points are POST methods and require the _User_ token access before for a successful request can be made.

# Installation and Set-up

## Requirements.
* Make sure you have Nodejs installed on yor local machine.
* Make sure you have MongoDB installed.

## Step 1
Clone this repo using the command -> git clone https://github.com/Adlai-1/Food-Delivery-API

## Step 2
In your terminal, cd into the directory and run npm install to download the necessary dependencies.

## Step 3
This API uses enviroment variables for some configurations which you have to setup. Simply, all you need to do is rename the file ".env.example" to ".env". Do not change its position in the directory.

## Step 4
Start the MongoDB server. 

## Step 5
Start the API server using the command npm start.

## Step 6
You can test the API using tools like cURL or Postman.
