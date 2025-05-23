const express = require("express");
const app = express();
const mongodb = require("./data/database");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(bodyParser.json());

app.use("/", require("./routes"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

mongodb.InitDb((err) => {
  if (err) {
    console.log("Error connecting to the database:", err);
  } else {
    app.listen(PORT, () => {
      console.log(`Connected to the database on port ${PORT}`);
    });
  }
});
