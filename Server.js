import { ApolloServer } from "apollo-server";
import {typeDefs} from "./GraphQL/TypeDefs.js"
import {resolvers} from "./GraphQL/Resolvers.js"
//import mongo from "mongoose";

//const { connect } = mongo;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
});


//let uri = process.env.MONGO;

//Establishing a connection for our MongoDB Server...
//connect(uri);


//Setting-up listener on port 500 number...
server.listen({ port: 500 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});