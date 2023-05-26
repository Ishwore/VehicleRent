const mongoose = require('mongoose');
const connectDB = async () => {
    mongoose
    .connect("mongodb://127.0.0.1:27017/vrent", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("database connected");
    })
    .catch(err => {
      console.log("Could not connect", err);
    });
}

module.exports=connectDB;