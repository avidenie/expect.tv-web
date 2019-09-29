import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import App from 'components/app'
import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import ReactDOM from 'react-dom'
import * as serviceWorker from 'serviceWorker'

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:4000'
  }),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
