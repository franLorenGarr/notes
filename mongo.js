const mongoose = require("mongoose");

const url =
  "mongodb+srv://chanfarin:SVEwFglFWySxgIdl@cluster0.n4wwkch.mongodb.net/noteAPP_db";

mongoose.set("strictQuery", false);

const connectDb = mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

module.exports = connectDb;
