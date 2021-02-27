# GraphQL

## What is GraphQL?

is a powerful query language allows for a more flexible & efficient approach than REST

**RESTful Aproach...**

Endpoint for getting a particular book:

`domain.com/books/:id`
title, genre, reviews, authorId

Endpoint for getting the author info of that book:

`domain.com/authors/:id`
name, age, biography, bookIds

**GraphQL Approach...**

Query to get book data and it's author data (AND the other books):

```js
{
  book(id:123) {
     title
     genre
     reviews
     author {
        name
        bio
        books {
          name
        }
     }
  }
}
```

we get all these information with just one query in `GraphQL`

Moreover, if you don't want all of these information and you just want some of that information then you can be selective at what you want to return from that query, for example we just want the title of the book and name of the author and name of the books.

```js
{
  book(id:123) {
    title
    author {
      name
      books { 
        name
      }
    }
  }
}
```

**Get many resources in a single request**

`GraphQL queries access not just the properties of one resource but also smoothly follow references between them. While typical REST APIs require loading from multiple URLs, GraphQL APIs get all the data your app needs in a single request. Apps using GraphQL can be quick even on slow mobile network connections.`

**Describe what’s possible with a type system**

`GraphQL APIs are organized in terms of types and fields, not endpoints. Access the full capabilities of your data from a single endpoint. GraphQL uses types to ensure Apps only ask for what’s possible and provide clear and helpful errors. Apps can use types to avoid writing manual parsing code.`


In this series we're going to create a GraphQL server using Node.js and we will querying that server from frontend.

## Project Overview

1. Server (Node.js)
  `Express App`
  `GraphQL Server`

2. Databae (MongoDB)
  `using mLab` => this is an online service which allows us to quickly generate a `mongoDB` instance so it's an online database
  
3. Client (browser)
  `React App`
  `Apollo` => this allows us to use GraphQL on the frontend inside React.
  
The good thing in GraphQL is that it's not specifically just for React, you can use it with other frameworks like `Angualr` or `Vue`


## Making Queries

to make query we will use the tool called `Graphiql` to test our queries.

for example I want to make a query to get the books and the `name` and `genre` and `id` of the books

```js
{
  books {
    name
    genre
  }
}
```

that's it. this is awesome!!!

another thing with GraphQL, is that inside the same Query we can request relational data, you don't have to make additional query, we can just nest up inside here.

```js
{
  books {
    name
    genre
    author {
      name
      age
    }
  }
}
```

## Express App Setup on Node

1. `mkdir server`
2. `cd server`
3. `npm init`
4. `npm install express`
5. `touch app.js`

app.js

```js
const express = require('express');

const app = express();

app.listen(4000, () => {
  console.log('now listening for requests on port 4000');
})
```


## Setting up GraphQL

1. `npm intsall graphql express-graphql`

`graphql` is the main package of graphql
`express-graphql` this package will make express understand graphql, because `express` lonely does not understand `graphql`


## GraphQL Schema

Schema defines our data structure

inside server folder create a folder called `schema` and inside of that create a file called `schema.js`


## Root Query

Root Queries are how we describe the user can initially jump in to the graph and grab data, we're gonna define these Root Queries inside the `schema` file


After server setup, you can run server on `localhost:4000/graphql?` and then inside there you can test your queris, for example inside there I test this

```js
{
  book(id: "1"){
    name
    genre
    id
  } 
}
```

OR For example I don't want `id` back to me from the server

```js
{
  book(id: "1"){
    name,
    genre
  }
}
```

Actually, I am sending these request to the server and I'm getting back data from server.


## GraphQL ID Type


## Type Relations

every book has an author, and every author has a collection of books. right now graphQL has no idea which book belongs to which author.

first we need to add the list of books a property called `authorId`

```js
{
  book(id: "2"){
    id
    name
    genre
    author {
      name
      age
    }
  }
}
```

## Connecting to mLab

we're going to save our data on `MongoDB`

`mLab` is an online service of saving data on `MongoDB`

got to `mLab.com` and create an account and the in server folder `npm i mongoose`



# React Apollo

to handle graphql data on client we use `React Apollo`

we want to create 2 components `BooksList` and `AddBook`

## Apollo Setup

in order to work with `GraphQL` on the client we need to work with GraphQL Client (React Apollo is one of them)

once we use RESTful APIs we could use some libraries like `axios` or `fetch` to help use make those requests, when it comes to `GraphQL` in order to make queries to server we need to use a `GraphQL Client Apollo` and it doesn't matter that we use `React` on the frontend here, it could be `Vue.js` or `Angular` we send request to the GraphQL server and we get back data from server and we pass data to the client application using `Apollo`, you can think of `Apollo` as the thing in charge passing of data between the frontend and server. `Apollo Client` is widely used. so let's look at apollo website to see how to setup apollo in React app.

1. `$. npm install @apollo/client graphql`

`@apollo/client`: This single package contains virtually everything you need to set up Apollo Client. It includes the `in-memory cache`, `local state management`, `error handling`, and a React-based view layer.

`graphql`: This package provides logic for parsing GraphQL queries.


2. Create a Client

Now that we have all the dependencies we need, let's initialize an `ApolloClient` instance. You'll need to provide it the URL of a running GraphQL server, such as this CodeSandbox instance.

In `index.js`, let's import `ApolloClient` from `@apollo/client` and provide our GraphQL server's URL as the uri property of the constructor's configuration object:

**index.js**

```js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});
```

That's it! Our client is ready to start fetching data. Now, before we start using Apollo Client with React, let's first try sending a query with plain JavaScript.

In the same `index.js` file, call `client.query()` with the query string shown below. You'll need to import the `gql` function to parse the query string into a query document.

**index.js**

```js
import { gql } from '@apollo/client';

// const client = ...

client
  .query({
    query: gql`
      query GetRates {
        rates(currency: "USD") {
          currency
        }
      }
    `
  })
  .then(result => console.log(result));
```

Run this code, open your console, and inspect the result object. You should see a data property with `rates` attached, along with some other properties like `loading` and `networkStatus`

Although executing GraphQL operations like this can be useful, Apollo Client really shines when it's integrated with a view layer like React. You can bind queries to your UI and update it automatically as new data is fetched.

### Connect Your Client to React

You connect Apollo Client to React with the `ApolloProvider` component. The ApolloProvider is similar to React's `Context.Provider`. It wraps your React app and places the client on the context, which `enables you to access it from anywhere in your component tree`.

In `index.js`, let's wrap our React app with an `ApolloProvider`. We suggest putting the `ApolloProvider` somewhere high in your app, above any component that might need to access `GraphQL data`. For example, it could be outside of your root route component if you're using React Router.

index.js

```js
import React from 'react';
import { render } from 'react-dom';

import { ApolloProvider } from '@apollo/client';

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo app 🚀</h2>
      </div>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById('root'));
```

Once your ApolloProvider is hooked up, you're ready to start requesting data with useQuery. useQuery is a React hook that use the Hooks API to share GraphQL data with your UI.

First, pass your GraphQL query (wrapped in the gql function) to the useQuery hook. When your component renders and the useQuery hook runs, a result object is returned that contains loading, error, and data properties:

Apollo Client tracks error and loading state for you, which are reflected in the loading and error properties.

When the result of your query comes back, it's attached to the data property.

Let's create an ExchangeRates component in index.js to see the useQuery hook in action:

```js
import { useQuery, gql } from '@apollo/client';

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
}
```

Congrats, you just made your first useQuery-based component! 🎉 If you render your ExchangeRates component within your App component from the previous example, you'll first see a loading indicator on the page, followed by data when it's ready. Apollo Client automatically caches this data when it comes back from the server, so you won't see a loading indicator if you run the same query again.

### Making Queries From React

for example I want to get a list of books and pass it to the books component and show the lists of books in that component.

Books.jsx

```js
import React from 'react'
import { gql, graphql } from 'react-apollo'

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`

const Books = (props) => {
  console.log(props) // in here we have access to books data backed from request
  return (
    ...
  )
}

export default graphql(getBooksQuery)(Books) // in here we bind data to backed from graphql request and we have access to them in props.
```

## Externalize queries into separate file

in here we don't want to make queries inside that component, we want to make queries inside another external component, which make our component clean.

create a folder called `queries` and create a file called `queries.js` to make your queries there, and then you can export your queris and use them inside your components.

queries/queries.js

```js
import { gql } from 'react-apollo'

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`

const getAuthorsQuery = gql`
  {
    authors {
      name
      age
      books {
        name
        id
      }
    }
  }
`

export { getAuthorsQuery, getBooksQuery };
```

and then you can use these queries inside your components.

books.jsx

```js
import React from 'react'
import { graphql } from 'react-apollo'
import { getBooksQuery } from './queries/queries'

const Books = (props) => {  
  ...
}

export default graphql(getBooksQuery)(Books)
```

## Mutations & Composing Queries

inside queries file create a mutation query

```js
const addBookMutation = gql`
  mutation {
    addBook(name: "", genre: "", authorId: "") {
      name
      id
    }
  }
`

export { addBookMutation }
```

now in order to use 2 queries inside one component, we need to compose two queries together
```js
import { graphql, compose } from 'react-apollo'
import { getBooksQuery, addBookMutation } from './queries/queries.js'

.
.
props.addBookQuery()
.
.

export default compose(
  graphql(getBooksQuery, { name: "getBooksQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
```


## Query variables

```js
const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!){
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
      id
    }
  }
`
```

`!` this shows that this field is `Required`

now how to call `addBookMutation` inside component

AddBook.js

```js
const [name, setName] = useState('')
const [genre, setGenre] = useState('')
const [authorId, setAuthorId] = useState(null)

props.addBookMutation({
  variables: {
    name,
    genre,
    authorId
  }
})
```


## Re-fetching Queries

now we add some data to the database using `addBookMutation` and after adding data to the database we want to update the data.

now for example we want to `update` the `getBooksQuery` after calling `addBookMutation`. how to do that?

```js
props.addBookMutation({
  variables: {
    name,
    genre,
    authorId
  }
  refetchQueries[{ query: getBooksQuery }]
})
```
