import { Collection, Db } from "mongodb";
import {ApolloError} from 'apollo-server'
import bcrypt from 'bcrypt'
import {v4 as uuidv4} from 'uuid'


export const Query =  {
    logIn: async(parent:any, args:any, context:{client:Db}) => {
      const user = await context.client.collection("R_Users").findOne({email:args['email']})
      try {
        if(user){
          //Para comprobar la contraseña encriptada
          const validPass = await bcrypt.compare(args["pwd"],user['pwd']);
          try {
            if(validPass){
              const token = uuidv4();
              await context.client.collection("R_Users").updateOne({email:args['email']},{'$set':{token:token}});
              return user;
            }
          } catch (error) {
            throw new ApolloError("Forbidden", "403");
          }
        }
      } catch (error) {
        throw new ApolloError("Forbidden", "403");
      }

    },
    logOut: async(parent:any, args:any, context:{client:Db}) => {
      const user = await context.client.collection("R_Users").findOne({email:args['email']})
      if(user){
        await context.client.collection("R_Users").updateOne({email:args['email']},{'$set':{token:null}});
        return user;
      }
    },
    // getRecipes: (parent:any,args:any, {recipes}:{recipes:any}) => {
    //   return {
    //   }
    //   return recipes.map((r,index) => ({
    //     ...r,
    //     id:index

    //   }))
    // },
    getRecipe:  (_:any, {id}:{id:number}, {recipes}:{recipes:any}) => {
      //const recipe = await context.client.collection("Recetas").findOne({'name':name})
      //console.log(recipe)
      //if(recipe){
        return {
          ...recipes[id],
          id
        }
      //}
      
    },
    // signOut: async(parent:any, args:any, context:{client:Db}) => {
    //   //Para comprobar la contraseña encriptada
    //   //const validPass = await bcrypt.compare(args["pwd"],context.user['pwd']);
    //   const user = await context.client.collection("R_Users").findOne({email:args['email']})
    //   if(user){
    //     await context.client.collection("R_Users").updateOne({email:args['email']},{'$set':{token:null}});
    //     return user;
    //   }

    // },
    // getIngrediente: async(parent:any,args:any,context:Db) => {
    //   const collection: Collection = context.collection("Ingredientes");
    //   try {
    //     const ingrediente = collection.findOne(args.name)
    //   } catch (error) {
    //     throw new ApolloError("Ingrediente no encontrado","402")
    //   }
        
    // },
    // getReceta: async(parent:any,args:any,context:Db) => {
    //   const collection: Collection = context.collection("Ingredientes");
    //   try {
    //     const ingrediente = collection.findOne(args.id)
    //   } catch (error) {
    //     throw new ApolloError("Receta no encontrado","402")
    //   }
        
    // }

}
export const User = {
  recipes: (parent: {id: number,name:string},args: any, context: {client:Db}) => {

  }
}

export const Recipe = {
  ingredients: (parent: {ingredients: number[]}, args: any, {ingredients}:{ingredients: any}) => {
    console.log(ingredients)
    return parent.ingredients.map((ing, index) =>({
      ...ingredients[index],
      id: index                                             
    }))
  }    
}

// export const Ingredient = {
//   recipes: (parent: {id:number,name:string}, args:any, {recipes}:{recipes:any},{ingredients}:{ingredients:any}) => {
//     return recipes.filter(r => r.ingredients.some(i => i === parent.id))
//   }
//}