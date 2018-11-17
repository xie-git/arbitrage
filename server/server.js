import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import mongoose from "mongoose";
import config from "./database/db";
import users from "./routes/api/users";
import profile from "./routes/api/profile";
import posts from "./routes/api/posts";
import news from "./routes/api/news";
import stocks from "./routes/api/stocks";
import stockBot from "./routes/api/stockBot";
const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(
    config.DB,
    { useNewUrlParser: true }
  )
  .then(
    () => {
      console.log("Database is connected");
    },
    err => {
      console.log("Can not connect to the database" + err);
    }
  );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(passport.initialize());

require("./config/passport").default(passport);

//routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/news", news);
app.use("/api/personalStocks", stocks);
app.use("/api/stockBot", stockBot);
app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
