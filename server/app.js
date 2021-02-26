const express = require('express');
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')

const app = express();

// express is gonna look at '/graphql' and say, ok I know what you want
// you want to interact with graphql, so because I don't understand graphql on my own
// what I'm gonna do is hand off the control of this request to graphqlHTTP because that does know
// how to hand off with graphql so as you can see I have used it as a function graphqlHTTP() and 
// this function is gonna fire whenever we're requesting to '/graphql' comes in
// and this function is gonna that graphql request and this function is gonna get some options
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('now listening for requests on port 4000');
});