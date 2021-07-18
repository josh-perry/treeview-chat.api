module.exports = (sequelize, Sequelize) => {
  const message = sequelize.define("message", {
    content: {
      type: Sequelize.STRING
    },
    sticky: {
      type: Sequelize.BOOLEAN
    }
  });

  message.belongsTo(message, { as: 'parent' });
  return message;
};

