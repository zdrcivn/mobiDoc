const Users = require("../data_access/models").User;
const bcrypt = require("bcrypt");

//login

const login = (req, res) => {
  Users.findOne({
    where: {
      email: req.body.email,
    },
  })

    .then((dbUser) => {
      if (!dbUser) {
        return res.status(404).send({ message: "User not found" });
      } else if (dbUser.password !== req.body.password) {
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
              console.log("Password Match!");
              return res.status(200).send(dbUser);
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

module.exports = {
  login,
};
