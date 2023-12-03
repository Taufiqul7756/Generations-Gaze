const express = require("express");
const router = require("express").Router();
const pool = require("../db.jsx");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator.js");

//registering
router.post("/register", async (req, res) => {
  try {
    //1. destructure the req.body
    const { name, email, password } = req.body;

    //2. check if user exist ( if user exist then throw error)
    const user = await pool.query("SELECT * From users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length !== 0) {
      return res.status(401).send("User already Exist");
    }

    //3. Bcrypt the user Password
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    //4. enter the new user inside our database
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    //5. Generating our jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);
    console.log(token);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server Error");
  }
});

//login---------------
router.post("/login", async (req, res) => {
  try {
    //1. destructure req.body
    const { email, password } = req.body;
    //2. check if user doesn't exist ( if not throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json("Password or email is incorrect");
    }
    //3. check if incoming password is the same the database password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    if (!validPassword) {
      return res.status(401).json("Password or email is incorrect");
    }

    //4. give them the jwt token
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server Error");
  }
});
module.exports = router;
