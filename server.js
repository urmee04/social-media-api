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

//------------------------------------------------//
//define the port (default to 3001 if not set)
//------------------------------------------------//
const PORT = process.env.PORT || 3001;

//------------------------------------------------//
//create a GET route at / to check DB connection
//------------------------------------------------//
app.get("/", async (req, res) => {
  try {
    //connect the client to the server
    await client.connect();
    //establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to MongoDB!");
    res.json({ message: "Successfully connected to the database!" });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    res.status(500).json({ message: "Failed to connect to the database." });
  } finally {
    //ensures that the client will close when finish/error
    await client.close();
  }
});

//------------------------------------------------//
//start the server and listen on defined port
//------------------------------------------------//
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
