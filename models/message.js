module.exports = (sequelize, Sequelize) => {
  const message = sequelize.define("message", {
    content: {
      type: Sequelize.STRING
    }
  });

  message.belongsTo(message, { as: 'parent' });
  return message;
};

