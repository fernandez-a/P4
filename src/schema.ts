import {gql } from 'apollo-server'

export const typeDefs = gql`
    type Ingredient{
        id: ID!
        name: String!
        recipes: [Recipe!]!
    }
    input IngredientInput{
        name: String!
        recipes: [ID!]!
    }

    type Recipe{
        id: ID!
        name: String!
        description: String!
        ingredients: [Ingredient!]!
        author: User!
    } 
    input RecipeInput{
        name: String!
        description: String!
        ingredients: [ID!]!
        author: String!
    }

    type User{
        id: ID!
        email: String!
        pwd: String!
        token: String
        recipes: [Recipe!]!
    }
    input UserInput{
        email: String!
        pwd: String!
        token: String
        recipes: [ID!]!
    }
  # type Ingredient{
  #   id: Int!
  #   name: String!
  #   #recipes: [Recipe!]!
  # }
  # type IngredientCantidad{
  #     Ingredient: Ingredient!
  #     amount: Int!
  # }

  # input IngredientCantidadInput{
  #   ingredient: Int!
  #   amount: Int!

  # }
  # type Recipe{
  #   id: Int!
  #   name: String!
  #   description: String!
  #   ingredients: [Ingredient!]!
  #   author: User!
  #   index: String!
  # }


  # input RecipeInput{
  #   title: ID!

  # }

  # type User{
  #   id: Int!
  #   email: String!
  #   pwd: String!
  #   token: String
  #   recipes: [Recipe!]!
  # }

  # input UserInput{
  #   email: String!
  # }
  type Query {
    logIn(email:String!,pwd:String!):User
    logOut(email:String!,pwd:String!):User
    # getIngrediente(id:String): Ingredient
    getRecipes: [Recipe!]!
    getRecipe(id:Int!) : Recipe 


  }
  type Mutation {
    signIn(email:String!,pwd:String!):User
    addIngrediente(id:Int!,name:String!):Ingredient
    addRecipe(id:Int!,name:String!,description:String!,ingredients: [Int!]!, author:String!):Recipe
  }
`