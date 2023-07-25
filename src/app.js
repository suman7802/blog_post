require("dotenv").config();
const cors = require("cors");
const express = require("express");
const parser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const userRouter = require("./routes/userRoute");
const blogRouter = require("./routes/blogRoute");
const validateToken = require("./middleware/validateToken");
const connectDB = require("./data/db");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(parser.urlencoded({extended: true}));

app.use("/api/user", userRouter);
app.use("/api/blog", validateToken, blogRouter);

async function startServer() {
  connectDB();
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}
startServer();
