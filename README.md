# Food-Delivery-API

This is a simple backend implementation for a food delivery app.

# Documentation

Title -> Simple API Documentation for a Food Delivery App.

Description -> According to specifications, the Api allows:

1. Users to browse through a list of Resturants.
2. Allow the user to place food orders.
3. Allow the user to handle order fulfillment.

# Tech Stack

The API was written in Javascript using the framework Express.

The Database used was MongoDB (NoSQL).

# Routers

In total there are 5 routers used in this API:

1. '/resturant'
2. '/menu'
3. '/order'
4. '/user'
5. '/admin'

# End-points

The end-points valid for this API will be grouped according to the routers mentioned above.

# The welcome End-point

Route Path -> '/welcome/:name

Request URL -> http://localhost:5000/welcome/David

Expected response -> {"message": "Hello David, welcome to the Food-Delivery-API"}

# The '/user' Router

This router is made up of 3 endpoints:

1. '/create' -> Is used to create new Users.

Route Path -> '/user/create'

Request URL -> http://localhost:5000/user/create

Expected Input: {"Name" : "David Nettey",
"Email" : "david@carrot.com",
"Telephone" : "0550903238",
"Password": "Dadlai1" }

Expected Output: {"message": "User Created!"}

NB: This is a POST method.

2. '/login' -> Is used to log Users in and provide them with an access token.

Route Path -> '/user/login'

Request URL -> http://localhost:5000/user/login

Expected Input: {"Email" : "david@carrot.com",
"Password": "Dadlai1" }

Expected Output: {"AuthToken": "fdfdf.dfdfdf.dfdfd"}

NB: This is a POST method.

3. '/admin/login' -> Is used to log Admin Users in and provide them with an access token

Route Path -> '/user/admin/login'

Request URL -> http://localhost:5000/user/admin/login

Expected Input: {"Email" : "david@carrot.com",
"Password": "Dadlai1" }

Expected Output: {"AuthToken": "fdfdf.dfdfdf.dfdfd"}

NB: This is a POST method.

# The '/admin' Router

This router is made up of 2 endpoints:

1. '/add/resturant' -> Is used to add new resturants to the Resturant collection in our DB.

Route Path -> '/admin/add/resturant'

Request URL -> http://localhost:5000/admin/add/resturant

Expected Input: {"Name": "Kasoa Cusine"
"Telephone": "0550903238"
"City": "Kasoa"
"Address":"House no. 2c Bridge Street"
}

Expected Output: {"message": "Order created!"}

2. '/add/menu' -> Is used to add new food dishes to the Menu collection in our DB.

Route Path -> '/admin/add/menu'

Request URL -> http://localhost:5000/admin/add/menu

Expected Input: {"Resturant": "649bd"
"Meal": "Waakye"
"Price": "Ghc 32.00"
}
where 649bd = The resturant ID

Expected Output: {"message": "Order created!"}

NB: Both end points are POST methods and require the _Admin_ token access before for a successful request can be made.

# The '/resturant' Router

This router is made up of 2 endpoints:

1. '/all' -> return an array list of all Resturants available in the DB.

Route Path -> '/resturant/all'

Request URL -> http://localhost:5000/resturant/all

Expected Input: None

Expected Output: {
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

2. '/:resturantId' -> return the details of a Resturant associated to the resturantId provided

Route Path -> '/resturant/23'

Request URL -> http://localhost:5000/resturant/23
where resturantId = 23

Expected Input: None

Expected Output: {
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

# The '/menu' Router

This router has only one endpoint:

1. '/resturant/:resturantId' -> returns menu associated with resturantId

Route Path -> '/menu/resturant/:resturantId'

Request URL -> http://localhost:5000/menu/resturant/4b6
where resturantId = 4b6

Expected Input: None

Expected Output:{
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

# The '/order' Router

This router is made up of 3 endpoints:

1. '/create' -> Is used to create a new food order for delivery

Route Path -> '/order/create'

Request URL -> http://localhost:5000/order/create

Expected Input: {
"User": "6493"
"Resturant": "6495d0"
"Meal": "Waakye"
"Price": "Ghc 40.00"
},
where "6493" is a User's ID and "6495d0" is a Resturant's ID

Expected Output: {"message": "Order created!"}

2. '/order/status/:orderId' -> Is used to check the status of an order

Route Path -> '/order/status/:orderId'

Request URL -> http://localhost:5000/order/status/34
where orderId = 34

Expected Input: None

Expected Output: {"PackageEnroute": false,
"PackageDelivered": false}

3. '/order/info/:orderId' -> returns info of an order associated with the orderId

Route Path -> '/order/info:orderId'

Request URL -> http://localhost:5000/order/info/34
where orderId = 34

Expected Input: None

Expected Output:{
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
