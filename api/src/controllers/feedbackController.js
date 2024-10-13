const Feedbacks = require("../data_access/models").Feedback;

const createFeedback = async (req, res) => {
  const { user_id } = req.params;
  const { feedback } = req.body;

  await Feedbacks.findOne({
    where: {
      user_id,
    },
  }).then((isFeedback) => {
    if (isFeedback) {
      return res.status(400).send("You have already submitted a feedback");
    } else {
      return Feedbacks.create({
        feedback,
        user_id: user_id,
        where: {
          user_id: user_id,
        },
      })
        .then(() => {
          res.status(201).send("Feedback created");
        })
        .catch((err) => {
          console.log("Error creating feedback", err);
        });
    }
  });
};

module.exports = {
  createFeedback,
};
