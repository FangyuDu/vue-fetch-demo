import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client/core'

// httpLink
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
})

// cache
const cache = new InMemoryCache()

// apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})
