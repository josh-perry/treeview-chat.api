module.exports = app => {
  const messages = require("../controllers/message.js");

  var router = require("express").Router();

  router.post("/:id", messages.create);
  router.get("/", messages.getRoot);
  router.get("/:id", messages.getChildren);

  app.use("/api/messages", router);
};
