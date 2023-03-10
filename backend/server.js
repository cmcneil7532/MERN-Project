
const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const { handleError } = require("./middleware/errorMiddleware");
const colors = require("colors");
const uri = process.env.MONGO_URI;
//------------Mongoose----------

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
//Connect to mongoDB
mongoose.connect(uri, { useNewUrlParser: true });

const db = mongoose.connection;
//Connected
db.once("open", () => {
  console.log('Database Connected to mongoDB');
});
//Error
db.on("error", (err) => {
  console.error("conncetion error", err);
});
//-------------EXPRESS--------------

const app = express();
//Looks for request that are based Content-type: application/json header is present
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//using our middleware when front end goes to api/goals and api/users our route will run
app.use("/api/goals", require("./routes/goalsRoute"));
app.use("/api/users", require("./routes/usersRoutes"));
//put custom errorHandle to our middleware
app.use(handleError);

app.listen(port, () => console.log(`Server started on port ${port}`));
