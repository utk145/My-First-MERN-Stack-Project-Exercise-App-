// This is the  entry file for the backend application, and its where we are gonna register the express application  

require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose"); // Now we can use  this to connect to the database

const workoutRoutes = require("./routes/workouts");


// express app: create a new express server
const app = express();

// middleware
app.use(express.json()); // what this does is that any request that comes in it looks if it has some body to the request, so some  data that we're sending to the server and if it does then it passes it and attaches it to the request object so that we can access it in the request handler

app.use((req, res, next) => {
    // request object, response object and next function that we need to run at the end of this middleware in order to move on to the next piece of middleware 
    console.log(req.path, req.method);
    next();
})


// // listen for request
// app.listen(process.env.PORT, () => {
//     console.log("Listening.. On port number 4000");
// })

// now we also need to react to requests, so we need a route handler for that
// app.get('/', (request, response) => {
//     response.json({ mssg: "Welcome to the App" });
// });  // This was just a dummmy test route

// app.use(workoutRoutes);
app.use("/api/workouts", workoutRoutes);


// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to DB and Listening On port number 4000");
        })
    })
    .catch((error) => { console.log(error) });






