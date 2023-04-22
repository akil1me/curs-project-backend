require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth-routes");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3002;

const startServer = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://akipax123:akipax123@reviews.pnptji0.mongodb.net/reviews?retryWrites=true&w=majority"
    );
    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
