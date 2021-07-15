const db = require("../models")
const messages = db.messages;

function createRoot() {
  const message = {
    content: "Root",
    parentId: null
  }

  messages.create(message);
  return message;
}

exports.create = (request, response) => {
  if (!request.body.content) {
    response.status(400).send({
      message: "Bad request - no content provided"
    });

    return;
  }

  const message = {
    content: request.body.content,
    parentId: request.params.id
  };

  messages.create(message)
    .then(data => {
      response.send(data);
    })
    .catch(error => {
      response.status(500).send({
        message: error.message || "Error creating message."
      });
    });
};

exports.getRoot = (request, response) => {
  messages.findOne({
      where: {
        parentId: null
      }
    })
    .then(data => {
      if (data === null) {
        response.send(createRoot());
      }

      response.send(data);
    })
    .catch(error => {
      response.status(500).send({
        message: "Error fetching root message"
      });
    });
};

exports.getChildren = (request, response) => {
  const id = request.params.id;

  messages.findAll({
      where: {
        parentId: id,
      },
    })
    .then((data) => {
      response.send(data);
    })
    .catch((error) => {
      response.status(500).send({
        message: `Error fetching children of ID '${id}'`,
      });
    });
};
