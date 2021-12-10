import { Collection, Db } from "mongodb";
import {ApolloError} from 'apollo-server'

export const Query =  {
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