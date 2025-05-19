const express = require("express");
const app = express();
const mongodb = require("./data/database");

const PORT = process.env.PORT || 3000;
app.use("/", require("./routes"));

mongodb.InitDb((err) => {
  if (err) {
    console.log("Error connecting to the database:", err);
  } else {
    app.listen(PORT, () => {
      console.log(`Connected to the database on port ${PORT}`);
    });
  }
});
