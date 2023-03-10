const mongoose = require("mongoose");

//Create our  user schemea
const goalSchema = mongoose.Schema(
  //Create special field called id which will associate specific goals with the specific user

  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      //The ref will help us associate which model to the correct user
      ref: 'User'
    },

    text: {
      type: String,
      //IF not text respond Please add text...
      required: [true, "Please add a text value"],
    },
  },
  {
    //Automatcally creat an updatedAt and createdAt field
    timestamps: true,
  }
);
//mongoose.model() takes to parameters the title you want to call when you import and the secong the schema thats created
module.exports = mongoose.model("GoalModel", goalSchema);
