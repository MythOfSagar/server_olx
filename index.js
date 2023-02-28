const connection = require("./config/db");
const express = require("express");
const {adRouter} = require("./routes/ad.route");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use("/ad", adRouter);

app.get("/", (req, res) => {
  res.send("OLX HOME");
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;

    console.log("Successfully connected to Database");
  } catch (err) {
    console.log(err);
  }
});
