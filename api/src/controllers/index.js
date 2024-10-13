const user = require("./userController");
const appointment = require("./appointmentControllers");
const login = require("./login");
const cht = require("./conversationController");
const feedback = require("./feedbackController");

module.exports = {
  user,
  appointment,
  login,
  cht,
  feedback,
};
