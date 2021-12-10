import { Collection, Db } from "mongodb";
import {ApolloError} from 'apollo-server'
import bcrypt from 'bcrypt'
import {v4 as uuidv4} from 'uuid'


export const Query =  {
    logIn: async(parent:any, args:any, context:{client:Db}) => {
      //Para comprobar la contraseña encriptada
      //const validPass = await bcrypt.compare(args["pwd"],context.user['pwd']);
      const user = await context.client.collection("R_Users").findOne({email:args['email']})
      if(user){
        const token = uuidv4();
        await context.client.collection("R_Users").updateOne({email:args['email']},{'$set':{token:token}});
        return user;
      }

    },
    logOut: async(parent:any, args:any, context:{client:Db}) => {
      //Para comprobar la contraseña encriptada
      //const validPass = await bcrypt.compare(args["pwd"],context.user['pwd']);
      const user = await context.client.collection("R_Users").findOne({email:args['email']})
      if(user){
        await context.client.collection("R_Users").updateOne({email:args['email']},{'$set':{token:null}});
        return user;
      }

    },
    getIngrediente: async(parent:any,args:any,context:Db) => {
      const collection: Collection = context.collection("Ingredientes");
      try {
        const ingrediente = collection.findOne(args.name)
      } catch (error) {
        throw new ApolloError("Ingrediente no encontrado","402")
      }
        
    },
    getReceta: async(parent:any,args:any,context:Db) => {
      const collection: Collection = context.collection("Ingredientes");
      try {
        const ingrediente = collection.findOne(args.id)
      } catch (error) {
        throw new ApolloError("Receta no encontrado","402")
      }
        
    }

}