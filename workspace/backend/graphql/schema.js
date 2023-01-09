import { buildSchema } from 'graphql'

export const schemaRoot = buildSchema(`
  type Query {
    hello(message: String): String
  }
  type User {
    id: ID!
    name: String!
    gender: String!
    age: Int!
  }
`)

const root = {
  User: {},
  Query: {
    hello: ({ message }) => {
      return `你好，${message}!`
    }
  }
}

export default {
  hello: root.Query.hello
}
