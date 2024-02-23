const mongoose = require('mongoose');
const url = "mongodb+srv://AkashAgrawal:Akash1907@cluster0.iap7tdo.mongodb.net/Sudoku?retryWrites=true&w=majority";
// const url = "mongodb://akashyoungster789:Qwerty%4012345@ac-7yqxzp9-shard-00-00.iap7tdo.mongodb.net:27017,ac-7yqxzp9-shard-00-01.iap7tdo.mongodb.net:27017,ac-7yqxzp9-shard-00-02.iap7tdo.mongodb.net:27017/?replicaSet=atlas-pabf4o-shard-0&ssl=true&authSource=admin"
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected to MongoDB");
    // Additional code for your application
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });