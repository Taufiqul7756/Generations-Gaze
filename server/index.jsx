const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json()); //req body
app.use(cors());

//ROUTES

//Register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//dashboard route
app.use("/dashboard", require("./routes/dashboard"));
app.use("/users", require("./routes/users"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
