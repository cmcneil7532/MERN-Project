const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const { handleError } = require("./middleware/errorMiddleware");
const colors = require("colors");
const uri = process.env.MONGO_URI;
//------------Mongoose----------

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose.connect(uri, { useNewUrlParser: true });

const db = mongoose.connection;
db.once("open", () => {
  console.log('Database Connected to mongoDB');
});

db.on("error", (err) => {
  console.error("conncetion error", err);
});
//-------------Mongoose--------------
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//using our middle ware when front end goes to api/goals our route will run
app.use("/api/goals", require("./routes/goalsRoute"));
app.use(handleError);

app.listen(port, () => console.log(`Server started on port ${port}`));
