const mongoose = require('mongoose');
const url = "mongodb+srv://akashyoungster789:Akash%401907@cluster0.iap7tdo.mongodb.net/Sudoku?retryWrites=true&w=majority";
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