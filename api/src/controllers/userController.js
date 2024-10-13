const bcrypt = require("bcrypt");
const Users = require("../data_access/models").User;

//create user

const createUser = async (req, res) => {
  //check for existing email
  await Users.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((dbUser) => {
      if (dbUser) {
        return res.status(409).send({ message: "Email already exist!" });
      } else if (req.body.email && req.body.password) {
        //password hash
        bcrypt.hash(req.body.password, 12, (err, result) => {
          if (err) {
            return res.status(500).send({ message: "Could not hash password" });
          } else if (result) {
            return Users.create({
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              age: req.body.age,
              gender: req.body.gender,
              family_history: req.body.family_history,
              email: req.body.email,
              password: result,
              is_active: true,
              role: "patient",
            })
              .then(() => {
                res.status(200).send({ message: "User created" });
              })
              .catch((err) => {
                console.log(err);
                res.status(502).send({ message: "Error creating user" });
              });
          }
        });
      } else if (!req.body.password) {
        res.status(400).send({ message: "Please provide password" });
      } else if (!req.body.email) {
        res.status(400).send({ message: "Please provide an email" });
      }
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

const createDoc = async (req, res) => {
  //check for existing email
  await Users.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((dbUser) => {
      if (dbUser) {
        return res.status(409).send({ message: "Email already exist!" });
      } else if (req.body.email && req.body.password) {
        //password hash
        bcrypt.hash(req.body.password, 12, (err, result) => {
          if (err) {
            return res.status(500).send({ message: "Could not hash password" });
          } else if (result) {
            return Users.create({
              description: req.body.description,
              time_availability: req.body.time_availability,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              age: req.body.age,
              gender: req.body.gender,
              email: req.body.email,
              password: result,
              is_active: true,
              role: "doctor",
            })
              .then(() => {
                res.status(200).send({ message: "User created" });
              })
              .catch((err) => {
                console.log(err);
                res.status(502).send({ message: "Error creating user" });
              });
          }
        });
      } else if (!req.body.password) {
        res.status(400).send({ message: "Please provide password" });
      } else if (!req.body.email) {
        res.status(400).send({ message: "Please provide an email" });
      }
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

//get all user
const getAllUsers = async (req, res) => {
  const allUsers = await Users.findAll({});
  return res.send(allUsers);
};

//get all user by role 'Doctors'

const getDoctors = async (req, res) => {
  const allusers = await Users.findAll({
    where: {
      role: "doctor",
    },
    order: [["updatedAt", "DESC"]],
  });
  return res.status(200).send(allusers);
};

//get user by id
const getUser = async (req, res) => {
  const { id } = req.params;
  const getUserbyID = await Users.findOne({
    where: {
      id,
    },
  });
  if (!getUserbyID) {
    res.status(404).send({ message: `NO user found with id ${id}` });
  }
  return res.send(getUserbyID);
};

//UPDATE USER
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, gender, email, description } = req.body;
  await Users.findOne({
    where: {
      id,
    },
  }).then((userData) => {
    if (!userData) {
      return res.status(404).send("No user with this id");
    } else {
      return Users.update(
        {
          description,
          first_name,
          last_name,
          gender,
          email,
        },
        {
          where: {
            id: id,
          },
        }
      )
        .then(() => {
          res.status(200).send("User updated");
        })
        .catch((err) => {
          console.log("Error updating user", err);
          res.status(400).send("Error updating user");
        });
    }
  });
};

const checkPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  await Users.findOne({
    where: {
      id: id,
    },
  })
    .then((userData) => {
      if (userData.password !== password) {
        bcrypt.compare(password, userData.password, (err, compareRes) => {
          if (err) {
            //error comparing password
            return res.status(400).send("Error comparing");
          } else if (compareRes) {
            //check the password is correct
            return res.status(201).send("Old password");
          } else {
            return res.status(401).send("Not your old password");
          }
        });
      }
    })
    .catch((err) => {
      console.log("Error user password", err);
    });
};

const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (password.length == 0) {
    return res.status(404).send("NO password");
  } else {
    bcrypt.hash(password, 12, (err, result) => {
      if (err) {
        return res.status(400).send("Error hashing password");
      } else if (result) {
        return Users.update(
          {
            password: result,
          },
          {
            where: {
              id: id,
            },
          }
        )
          .then(() => {
            res.status(200).send("Password successfully changed");
          })
          .catch((err) => {
            console.log("Error updating password", err);
            res.status(400).send("Error updating password");
          });
      }
    });
  }
};

//DELETE USER
const deleteUser = async (req, res) => {
  const { id } = req.params;
  await Users.findOne({
    where: {
      id,
    },
  }).then((user) => {
    if (!user) {
      return res.status(404).send({ message: `No user found with id ${id}` });
    } else {
      return Users.destroy({
        where: {
          id,
        },
      })
        .then(() => {
          res.status(200).send({ message: "User deleted" });
        })
        .catch((err) => {
          console.log("Error", err);
          res.status(400).send({ message: "Error deleting a user" });
        });
    }
  });
};

//forgot Password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const password = "1234";

  await Users.findOne({
    where: {
      email: email,
    },
  }).then((dbUser) => {
    if (!dbUser) {
      return res.status(404).send("No user with this email");
    } else {
      //return res.status(200).send(dbUser);
      bcrypt.hash(password, 12, (err, result) => {
        if (err) {
          return res.status(400).send("Error hashing password");
        } else if (result) {
          return Users.update(
            {
              password: result,
            },
            {
              where: {
                email: email,
              },
            }
          )
            .then(() => {
              res.status(200).send("Password successfully changed");
            })
            .catch((err) => {
              console.log("Error updating password", err);
              res.status(400).send("Error updating password");
            });
        }
      });
    }
  });
};

module.exports = {
  createUser,
  createDoc,
  getAllUsers,
  getDoctors,
  getUser,
  updateUser,
  checkPassword,
  updatePassword,
  deleteUser,
  forgotPassword,
};
