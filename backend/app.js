require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const mongodb = require("./db");
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
//const apiDocs = './swagger.json';
const bodyParser = require('body-parser');

const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'swagger.json'), 'utf8'));

app.use(bodyParser.json());

// Connect to MongoDB
mongodb();

// CORS configuration
app.use(cors({
  origin: ["http://localhost:3000","http://localhost:3001"], // Allow requests from this origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow these methods
  allowedHeaders: ["Content-Type", "Authorization"] // Allow these headers
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// API route for creating users
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));

app.use("/api", require("./Routes/CreateUser"));
app.use("/api",require("./Routes/DisplayData"));
app.use("/api",require("./Routes/OrderData"));

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
