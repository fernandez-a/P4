import { Collection, Db } from "mongodb";
import { v4 as uuidv4 } from 'uuid';
import bcrypt  from "bcrypt"
const saltRound = 10

export const Mutation = {
    signIn: async(parent:any,args:any,context:{client:Db}) => {
        //let hasshed_passw:string
        const user = {...args};
        // const token = uuidv4();
        // user['token'] = token;
        let hasshed_passw =  await bcrypt.hash(user.pwd, saltRound);
        user['pwd'] = hasshed_passw;
        context.client.collection("R_Users").insertOne({email:user['email'], pwd:user['pwd'],token:null,recipies:[]})
        return user;


    }
    // addIngrediente: async(parent:any,args:any,context:Db) => {
    //             const ingrediente = {...args};
    //             const collection: Collection = context.collection("Ingredientes");
    //             collection.insertOne(ingrediente);
    //             return ingrediente;
    //         },
}