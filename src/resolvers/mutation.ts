import { Collection, Db } from "mongodb";
import bcrypt from "bcrypt"
const saltRounds = 10;

export const Mutation = {
    signIn: async(parent:any,args:any,context:{client:Db}) => {
        //let hasshed_passw:string
        const user = {...args};
        // const token = uuidv4();
        // user['token'] = token;
        bcrypt.hash(user.pwd, saltRounds, function(err, hash){
            user['pwd'] = hash;
            context.client.collection("R_Users").insertOne({email:user['email'], pwd:user['pwd'],token:null,recipies:[]})
            
        });
        return user['pwd'];


    }
    //addIngrediente: async(parent:any,args:any,context:Db) => {
        //         const ingrediente = {...args};
        //         const collection: Collection = context.collection("Ingredientes");
        //         collection.insertOne(ingrediente);
        //         return ingrediente;
        //     },
}