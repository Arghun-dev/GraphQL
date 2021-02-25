// in this file we're gonna define our schema our schema will describe data that is kind of graph
// it describes the object types and relations between those object types and it describes how we can reach 
// into the graph, how we can retrieve and change that data

// in this app I have books and authors, so ultimately we need to describe these two object types in the
// schema file and the relations between them and also how to query these object types to get data

const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});