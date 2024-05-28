const mongoose = require("mongoose");

const main = async () => {
  await mongoose.connect(
    "mongodb+srv://sidiq:sidiq1131235@rentaway.plncv6d.mongodb.net/?retryWrites=true&w=majority&appName=rentaway"
  ),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  console.log("Connected to MongoDB!");
};

main().catch((err) => console.log(err));
