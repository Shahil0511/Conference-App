const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./lib/db");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const conferenceRoute = require("./routes/conferenceRoute");

const errorHandler = require("./middlewares/errorHandler");

const app = express();

dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5001;

// routes
app.use("/api", userRoute);
app.use("/api", adminRoute);
app.use("/api/conference", conferenceRoute);

// middleware
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`Server is Running on Port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    process.exit(1);
  }
};

startServer();
