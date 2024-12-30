require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectToDB = require("./database/db");
const authRoutes = require("./routes/auth.routes");

const PORT = process.env.PORT || 5000;
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//Routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is Running on Port : ${PORT}`);
});

//connect to database
connectToDB();
