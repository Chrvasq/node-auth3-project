const router = require("express").Router();
const Users = require("../users/users-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");
const auth = require("../auth/auth-required-middleware");

router.get("/users", auth, async (req, res) => {
  const { department } = req.decodedJwt;
  const users = await Users.findByDepartment({ department });

  users
    ? res.status(200).json(users)
    : res.status(500).json({ message: "Unable to retrieve users." });
});

router.post("/register", async (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => res.status(201).json(saved))
    .catch(err => res.status(500).json(err));
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        token = generateToken(user);
        res.status(200).json({ message: `Welcome ${user.username}!`, token });
      } else {
        res.status(401).json({ message: "Invalid credentials." });
      }
    })
    .catch(err => res.status(500).json(err));
});

function generateToken(user) {
  payload = {
    sub: user.id,
    username: user.username,
    department: user.department
  };
  options = {
    expiresIn: "8h"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
