const express = require("express");
const router = require("express").Router();
const pool = require("../db.jsx");
const bcrypt = require("bcrypt");

//registering
router.post("/register", async (req, res) => {
  try {
    //1. destructure the req.body ( name, email, password)
    const { name, email, password } = req.body;
    //2. check if user exist ( if user exist then throw error)
    const user = await pool.query("SELECT * From users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length !== 0) {
      return res.status(401).send("User already Exist");
    }
    //3. Bcrypt the user Password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(password, salt);
    //4. enter the new user inside our database
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ( $1,$2,$3) RETURNING *",
      [name, email, bcryptPassword]
    );
    res.json(newUser.rows[0]);
    //5. Generating our jwt token
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server Error");
  }
});
module.exports = router;
