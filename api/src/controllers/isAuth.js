const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../data_access/models").user;

const login = (req, res) => {
  //checks if email exists
  Users.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((dbUser) => {
      if (!dbUser) {
        return res.status(404).send({ message: "User not found" });
      } else {
        //password hash
        bcrypt.compare(
          req.body.password,
          dbUser.password,
          (err, compareRes) => {
            if (err) {
              // error while comparing
              res
                .status(502)
                .send({ message: "Error while checking user password" });
            } else if (compareRes) {
              // password match
              const token = jwt.sign({ email: req.body.email }, "secret", {
                expiresIn: "1h",
              });
              res.status(200).send({ message: "users log in", token: token });
            } else {
              res.status(401).send({ message: "invalid credentials" });
            }
          }
        );
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
};

const isAuth = (req, res) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).send({ message: "not authenticated" });
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secret");
  } catch (err) {
    return res
      .status(500)
      .send({ message: err.message || "could not decode token" });
  }
  if (!decodedToken) {
    res.status(401).send({ message: "unauthorized" });
  } else {
    res.status(200).send({ message: "here is your resource!" });
  }
};

module.exports = {
  login,
  isAuth,
};
