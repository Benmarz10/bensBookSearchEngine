const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Number
    savedBooks: [Book]!
  }
  
  type Query {
    me: User
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors:[String]!, description: String!, title: String!, image: Image!, link: Link!): User
    removeBook(bookId: ID): User
  }
  
  type Book {
    bookId: ID
    authors: [String]!
    description: String
    title: String
    image: Image
    link: Link
  }
  
  type Auth {
    token: String
    user: User
  }
  `;
module.exports = typeDefs;