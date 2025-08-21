//load environment variables from .env file
require("dotenv").config();

//import Express framework
const express = require("express");

//create an Express application instance
const app = express();

//import MongoDB client for database connectivity
const { MongoClient } = require("mongodb");

//MongoDB connection URI - using environment variable to keep credentials secure
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

async function run() {
  try {
    //connect the client to the server
    await client.connect();
    //establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to MongoDB!");
  } finally {
    //ensures that the client will close when finish/error
    await client.close();
  }
}
//execute the database connection function with error handling
run().catch(console.dir);
