const mongoose = require("mongoose");

//Create our scheme
const goalSchema = mongoose.Schema(
  {
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
