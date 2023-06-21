import { gql } from "apollo-server"

export const typeDefs = gql`
scalar Date

type Response {
    code: Int
    message: String
}

type menu {
    Food: String
    Price: String
}

input user{
    Name: String!
    Email: String!
    Telephone: String!
    Password: String
}

input resturant{
    Name: String!
    Telephone: String!
    City: String!
    Address: String!
    Description: String!
}

type User {
    _id: ID
    Name: String
    Email: String
    Telephone: String
    Password: String
    createdAt: Date
    updatedAt: Date
}

type Resturant {
    _id: ID
    Name: String
    Telephone: String
    City: String
    Address: String
    Description: String
    createdAt: Date
    updatedAt: Date
}

type Order {
    _id: ID
    User: String
    Resturant: String
    OrderedMeal: String
    Price: String
}

type Menu {
    _id: ID
    Resturant: String
    Menu: [menu]
}

type FulfillmentOrder {
    _id: ID
    User: String
    Order: String
    PayedFor: Boolean
    DeliveredTo: Boolean
}

type Query {
    welcome: String
    Users: [User]
    UserInfo (userId: ID) : User
    ResturantInfo (resturantId: ID): Resturant
    Resturants: [Resturant]
}

type Mutation{
    CreateUser (UserData: user ): Response
    AddResturant (ResturantData: resturant): Response
}
`