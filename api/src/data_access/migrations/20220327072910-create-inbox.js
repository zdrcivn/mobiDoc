"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("inboxes", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      user1_id: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      user2_id: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      // users_id: {
      //   allowNull: false,
      //   type: Sequelize.ARRAY(Sequelize.UUID),
      // },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("inboxes");
  },
};
