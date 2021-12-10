import {gql } from 'apollo-server'

export const typeDefs = gql`
type Ingredient{
    id: ID!
    name: String!
    recipes: [Recipe!]!
  }
  
  type Recipe{
    id: ID!
    name: String!
    description: String!
    ingredients: [Ingredient!]!
    author: User!
  }
  
  type User{
    id: ID!
    email: String!
    pwd: String!
    token: String
    recipes: [Recipe!]!
  }
  type Query {
    getIngrediente(id:String): Ingrediente
    getReceta(id:ID!): Receta
    #getReceteas:Receta


  }
  # type Mutation {
  #   signIn(email:String!,pwd:String!):User
  # }
`