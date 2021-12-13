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

const ingredients = ["arroz","lentejas","garbanzos"]
const recipes = [
  {name:"paella", ingredients:[0,1,2]},
  {name:"lentejas", ingredients:[0,2]},
  {name:"cocido", ingredients:[2]},
]

  const run = async () => {
    const client = await connectDB()
    const validMutation = ["SignOut",,"LogOut","AddIngredient","DeleteIngredient","AddRecipe","UpdateRecipe","DeleteRecipe"]
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({req,res}) => {
        //validToken.some((q) => req.body.query.includes(q))
        //if(req.body.query !== validToken){
        const recipes = await client.collection("Recetas").find().toArray();
        const ingredients = await client.collection("Ingredientes").find().toArray();
        if(validMutation.some((q) => req.body.query.includes(q))){
          if(req.headers['token'] != null){
            const user = await client.collection("R_Users").findOne({token:req.headers['token']})
            if(user){
              return{
                client,
                user,
                ingredients,
                recipes
              }
            }
            else res.sendStatus(403);
          }
          else res.sendStatus(403);
        } 
        else{
          return{
            client,
            recipes,
            ingredients
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