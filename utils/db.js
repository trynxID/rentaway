const mongoose = require("mongoose");
require("dotenv").config();

const main = async () => {
  await mongoose.connect(process.env.MONGODB_URI),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  console.log("Connected to MongoDB!");
};

main().catch((err) => console.log(err));
