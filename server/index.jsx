const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());

//ROUTES

//Register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//dashboard route
app.use("/dashboard", require("./routes/dashboard"));

//User route
app.use("/users", require("./routes/users"));

app.get("/", (req, res) => {
  res.send("Welcome to Family Tree API");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
