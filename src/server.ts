import { connectDB } from "./DBConnection"
import {ApolloError, ApolloServer } from 'apollo-server'
import {typeDefs} from "./schema"
import {Query} from "./resolvers/query"
import {Mutation} from "./resolvers/mutation"
//import bcrypt from "bcrypt"
const saltRounds = 10;
const resolvers = {
    Query,
    //Mutation
  };



  const run = async () => {
    const client = await connectDB()
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({req,res}) => {
            return{
              client
            }
        },
  
    });
    server.listen(4000).then(() => {
      console.log(`🚀  Server ready `);
      });
  }
  try{
    run()
  }catch (e) {
      console.error(e);
  }