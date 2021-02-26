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
