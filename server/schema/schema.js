// in this file we're gonna define our schema our schema will describe data that is kind of graph
// it describes the object types and relations between those object types and it describes how we can reach 
// into the graph, how we can retrieve and change that data

// in this app I have books and authors, so ultimately we need to describe these two object types in the
// schema file and the relations between them and also how to query these object types to get data

// What we've done here?
// first we inported graphql and then we grabbed these things from GraphQL
// then what we've done is we defined our first object type and that is a BookType
// then we defined the RootQuery which defined how we initially jump into the graph

const graphql = require('graphql');
var _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
var books = [
  {name: 'Name of the Wind', genre: 'Fantasy', id: '1'},
  {name: 'The Final Empire', genre: 'Fantasy', id: '2'},
  {name: 'The Long Earth', genre: 'Sci-Fi', id: '3'}
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db or other source
        // parent will come into play when we want relationships between data
        // the first parameter is the Array we're going to search and the second parameter is how we find that
        // this is how we find and search data in database
        return _.find(books, { id: args.id })
      }
    }
  }
})

// here we're going to define graphQL schema
// inside here we're gonna pass through our initial root query
module.exports = new GraphQLSchema({
  query: RootQuery
})