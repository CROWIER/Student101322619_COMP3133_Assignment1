const express = require('express');

const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const resolvers = require('./resolvers');
const mongoose = require("mongoose");

const app = express();

// Connect to MongoDB

const uri = 'mongodb+srv://Askar:Askar2002@cluster0.iftn8ij.mongodb.net/comp3133_assignment1?retryWrites=true&w=majority'

async function connect() {
    try {
        await mongoose.connect(uri)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error(error)
    }
}

connect()

// Define a GraphQL endpoint
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
}));

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));