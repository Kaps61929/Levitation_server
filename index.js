const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const fs = require('fs');
const path = require('path');
const https=require("https")
require('dotenv').config();
// INIT
const PORT = process.env.PORT;
const authRoutes=require('./routes/auth');
const postRoutes=require('./routes/post');
// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 300 minutes
  max: 200, // limit each IP to 200 requests per windowMs
});
const app = express();

const DB =process.env.DBurl
  
// Connections
mongoose.set("strictQuery", false);
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((e) => { 
    console.log(e);
  });

// middleware
app.use(express.json());
app.use(helmet());
app.use("/auth", authRoutes);
app.use("/blog", postRoutes);
app.use(limiter); 

const privateKey = fs.readFileSync('./key.pem', 'utf8');
const certificate = fs.readFileSync('./cert.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };
  
const httpsServer = https.createServer(credentials, app);
// Start HTTPS server
httpsServer.listen(3000, () => {
  console.log('Server started on HTTPS, port 3000');
});