const Appointments = require("../data_access/models").appointment;
const Users = require("../data_access/models").User;

//create appointment by user

const createApt = (req, res) => {
  const { reason, user_id, doctor_id } = req.body;
  //create appointment with a status of pending
  return Appointments.create({
    user_id,
    reason,
    doctor_id,
    status: "Pending",
  })
    .then(() => {
      res.status(200).send({ message: "Success" });
    })
    .catch((err) => console.log("error", err));
};

//get all appointment
const getAllApt = async (req, res) => {
  const allAppointments = await Appointments.findAll({
    order: [["createdAt", "ASC"]],
  });
  return res.status(200).send(allAppointments);
};

// get All Appointments by a user
const getApt = async (req, res) => {
  const { id } = req.params;
  const dbUser = await Users.findOne({
    where: {
      id,
    },
  });
  if (dbUser.role == "patient") {
    const apt = await Appointments.findAll({
      // attributes: {
      //   exclude: ["createdAt", "updatedAt"],
      // },
      where: {
        user_id: id,
      },
      include: { all: true },
      order: [["createdAt", "ASC"]],
    });

    return res.status(200).send(apt);
  } else {
    const apt = await Appointments.findAll({
      // attributes: {
      //   exclude: ["createdAt", "updatedAt"],
      // },
      where: {
        doctor_id: id,
        status: "Pending",
      },
      include: { all: true },
      order: [["createdAt", "ASC"]],
    });

    return res.status(200).send(apt);
  }
};

//get all appointment by user and decline all
const getAndUpdateApt = async (req, res) => {
  const { id } = req.params;

  await Users.findOne({
    where: {
      id,
    },
  }).then((dbUser) => {
    if (!dbUser) {
      return res.status(404).send("No user");
    } else {
      Appointments.findAll({
        where: {
          doctor_id: id,
          status: "Pending",
        },
        include: { all: true },
        order: [["createdAt", "ASC"]],
      }).then((allApt) => {
        if (!allApt) {
          return res.send("No current appointments");
        } else {
          Appointments.update(
            {
              status: "Declined",
              note: "Healthcare workers are unavailable at this time.",
            },
            {
              where: {
                status: "Pending",
              },
            }
          ).then(() => {
            return res
              .status(200)
              .send("All pending appointments has been declined");
          });
        }
      });
    }
  });
};

//update status to approved status
const updateStatus = async (req, res) => {
  const { status, note } = req.body;
  const { id } = req.params;
  await Appointments.update(
    {
      status,
      note,
    },
    {
      where: {
        apt_id: id,
      },
    }
  );
  return res.status(200).send("Approved");
};

//update status to declined status
const declinedStatus = async (req, res) => {
  const { id } = req.params;
  await Appointments.update(
    {
      status: "Declined",
    },
    {
      where: {
        apt_id: id,
      },
    }
  );
  return res.status(200).send("Appointment declined");
};

// delete appointment by id

const delApt = async (req, res) => {
  const { id } = req.params;
  await Appointments.findOne({
    where: {
      apt_id: id,
    },
  }).then((apt) => {
    if (!apt) {
      return res.status(400).send("No appointment");
    } else {
      return Appointments.destroy({
        where: {
          apt_id: id,
        },
      })
        .then(() => {
          res.status(200).send("Appointment deleted");
        })
        .catch((err) => {
          console.log("Error", err);
          res.status(400).send("Error deleting appointment");
        });
    }
  });
};

module.exports = {
  createApt,
  getAllApt,
  getApt,
  getAndUpdateApt,
  updateStatus,
  declinedStatus,
  delApt,
};
