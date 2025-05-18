const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.post("/", (req, res) => {
  const { fname, lname, occupation_cat, occupation, email, password } =
    req.body;
  const newUser = { fname, lname, occupation_cat, occupation, email, password };

  const filePath = path.join(__dirname, "..", "data", "user.json");
  let users = [];
  if (fs.existsSync(filePath)) {
    let data = fs.readFileSync(filePath, "utf-8");
    users = JSON.parse(data);

    const duplicate = users.find((user) => user.email === email);
    if (duplicate) {
      return res.status(409).json({ status: "This email has already been used." });
    }
    users.push(newUser);

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    res.status(200).json({ status: "Register successfully", newUser });
  } else {
    users.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    res.status(200).json({ status: "Register successfully", newUser });
  }
});

module.exports = router;

