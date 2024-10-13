const { Router } = require("express");
const router = Router();
const Users = require("../controllers").user;
const Appointment = require("../controllers").appointment;
const Login = require("../controllers").login;
const Cht = require("../controllers").cht;
const fdbck = require("../controllers").feedback;

//LOGIN
router.post("/login", Login.login);

//USERS
router.post("/create-doctor", Users.createDoc); // create doctor
router.post("/create-user", Users.createUser); // create user
router.get("/users", Users.getAllUsers); //all users
router.get("/users/doctors", Users.getDoctors); //get user by role 'doctor'
router.get("/users/:id", Users.getUser); // user by id
router.put("/update-user/:id", Users.updateUser); // update user
router.post("/users/:id/password", Users.checkPassword); // checkpassword;
router.put("/users/:id/password", Users.updatePassword); //change password;
router.delete("/delete-user/:id", Users.deleteUser); //delete user
//for forgot pass
router.post("/users/forgot-password", Users.forgotPassword);

//Appointment
router.post("/create-appointment", Appointment.createApt); //create appointment
//router.get("/status", Appointment.getAptStats); //appointment by status
router.get("/appointments", Appointment.getAllApt); //all appointments
router.get("/appointments/:id", Appointment.getApt); //appointment by user_id
router.delete("/appointments/:id", Appointment.delApt); //delete apt
//status
router.put("/appointments/status/:id", Appointment.updateStatus); //approved status
router.put("/appointments/pending/:id", Appointment.getAndUpdateApt);

//chats
router.post("/inbox", Cht.findOrCreateConversation); //find or create conversation
router.post("/:inbox_id/create_message", Cht.createMessage); // create message
router.get("/inboxes/:user_id", Cht.findAllConversation); //find all conversation by user_id
router.get("/:inbox_id/chats", Cht.findAllChats); //find all chats in a specific by inbox_id
router.delete("/inboxes/:inbox_id", Cht.deleteInbox); //delete inbox
router.delete("/:inbox_id/chats", Cht.deleteAllChats); //delete all chats

//feedback

router.post("/feedback/:user_id/submit", fdbck.createFeedback); //create feedback

module.exports = router;
