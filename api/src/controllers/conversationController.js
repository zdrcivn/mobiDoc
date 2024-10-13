const { Sequelize } = require("../data_access/models");

const Users = require("../data_access/models").User;
const Chats = require("../data_access/models").Chats;
const Inbox = require("../data_access/models").Inbox;

const findOrCreateConversation = (req, res) => {
  const { user1Id, user2Id } = req.body;

  //check for existing inbox
  return Inbox.findOne({
    where: {
      user1Id: {
        [Sequelize.Op.or]: [user1Id, user2Id],
      },
      user2Id: {
        [Sequelize.Op.or]: [user1Id, user2Id],
      },
    },
    include: [
      {
        model: Users,
        as: "user2",
        attributes: [
          "id",
          "first_name",
          "last_name",
          "email",
          "gender",
          "role",
        ],
      },
      {
        model: Chats,
      },
    ],

    order: [[{ model: Chats }, "createdAt", "DESC"]],
  }).then((conversation) => {
    if (conversation) {
      //creates message for existing inbox
      return Chats.create({
        where: {
          inbox_id: conversation.id,
        },
        inbox_id: conversation.id,
        message: req.body.message,
        user_id: conversation.user1Id,
      }).then(() => {
        res.send("Message created");
      });
    } else {
      //create inbox if theres no existing inbox
      Inbox.create(
        {
          user1Id,
          user2Id,
        },
        {
          include: { model: Chats },
          order: [[(model = Chats), "createdAt", "DESC"]],
        }
      )
        .then((newInbox) => {
          //create message
          return Chats.create({
            where: {
              inbox_id: newInbox.id,
            },
            inbox_id: newInbox.id,
            message: req.body.message,
            user_id: newInbox.user1Id,
          });
        })
        .then(() => {
          res.status(200).send("Inbox and message created");
        });
    }
  });
};

//conversation by a specific user
const findAllConversation = async (req, res) => {
  const { user_id } = req.params;
  await Inbox.findAll({
    where: {
      [Sequelize.Op.or]: {
        user1Id: user_id,
        user2Id: user_id,
      },
    },
    include: [
      {
        model: Users,
        as: "user1",
        attributes: [
          "id",
          "first_name",
          "last_name",
          "email",
          "gender",
          "role",
        ],
      },
      {
        model: Users,
        as: "user2",
        attributes: [
          "id",
          "first_name",
          "last_name",
          "email",
          "gender",
          "role",
        ],
      },
      {
        model: Chats,
      },
    ],
    order: [
      [{ model: Chats }, "createdAt", "DESC"],
      ["createdAt", "DESC"],
    ],
  }).then((conversation) => {
    if (!conversation) {
      return res.status(404).send("No inboxes");
    } else {
      return res.status(200).send(conversation);
    }
  });
};

const createMessage = (req, res) => {
  const { inbox_id } = req.params;
  const { user_id, message } = req.body;

  Chats.create({
    where: {
      inbox_id: inbox_id,
    },
    message,
    user_id,
    inbox_id,
  }).then((msg) => {
    return res.status(201).send(msg);
  });
};

const findAllChats = async (req, res) => {
  const { inbox_id } = req.params;
  await Chats.findAll({
    where: {
      inbox_id: inbox_id,
    },
    include: { all: true },
    order: [["createdAt", "DESC"]],
  })
    .then((cht) => {
      return res.status(200).send(cht);
    })
    .catch((err) => {
      console.log("Error", err);
      return res.status(400).send("NO message in this inbox");
    });
};

//delete inbox by id
const deleteInbox = async (req, res) => {
  const { inbox_id } = req.params;

  await Inbox.findOne({
    where: {
      id: inbox_id,
    },
  }).then((inbx) => {
    if (!inbx) {
      return res.status(400).send("No inbox with this id");
    } else {
      return Inbox.destroy({
        where: {
          id: inbox_id,
        },
      }).then(() => {
        res.status(200).send("Inbox deleted");
      });
    }
  });
};

//delete all chats with  inbox_id
const deleteAllChats = async (req, res) => {
  const { inbox_id } = req.params;
  await Chats.findAll({
    where: {
      inbox_id,
    },
  }).then((chts) => {
    if (chts.length == 0) {
      return res.status(500).send("No chats in this inbox");
    } else {
      return Chats.destroy({
        where: {
          inbox_id,
        },
      }).then(() => {
        res.status(200).send("Deleted all chats successfully");
      });
    }
  });
};

module.exports = {
  findOrCreateConversation,
  findAllConversation,
  findAllChats,
  createMessage,
  deleteInbox,
  deleteAllChats,
};
