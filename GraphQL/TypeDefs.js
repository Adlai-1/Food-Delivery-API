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

type User {
    _id: ID
    Name: String
    Email: String
    Telephone: String
    Password: String
    createdAt: Date
    updatedAt: Date
}

type Resturants {
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

type Query{
    welcome: String
}
`