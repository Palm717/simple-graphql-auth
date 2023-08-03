const { gql } = require("apollo-server");

module.exports = gql`
  type Todo {
    id: ID!
    username: String!
    text: String!
    created: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    created: String!
    token: String!
  }

  input RegisterUserInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getTodos: [Todo]
  }
  type Mutation {
    createTodo(text: String!): Todo!
    deleteTodo(todoId: ID!): String!

    LoginUser(username: String!, password: String!): User!
    RegisterUser(user: RegisterUserInput!): User!
  }
`;
