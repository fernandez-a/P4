import { connectDB } from "./DBConnection"
import {ApolloError, ApolloServer } from 'apollo-server'
import {typeDefs} from "./schema"
import {Query} from "./resolvers/queries"
import {Mutation} from "./resolvers/mutations"
import bcrypt from "bcrypt"
// import { sign } from "crypto"
const saltRounds = 10;
const resolvers = {
    Query,
    Mutation
  };



  const run = async () => {
    const client = await connectDB()
    const validToken = "signIn"
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({req,res}) => {
        //validToken.some((q) => req.body.query.includes(q))
        //if(req.body.query !== validToken){
          if(req.headers['token'] != null){
            const user = await client.collection("R_Users").findOne({token:req.headers['token']})
            if(user){
              return{
                client,
                user
              }
            }
            else res.json({info:"Not found, register first"});
          }
          else{
            return{
              client
            }
          }
          //res.sendStatus(403);
        //}
        
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