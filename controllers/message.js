const db = require("../models")
const messages = db.messages;

async function createDefaultStickies(parentId) {
  const defaultStickies = [
    "Please be nice.",
    "All messages are wiped at midnight (UTC).",
    "Find the code on <a href='https://github.com/josh-perry/treeview-chat.web'>GitHub</a>"
  ];

  defaultStickies.forEach(content => {
    messages.create({
      content,
      parentId,
      sticky: true
    });
  });
}

async function createRoot() {
  const message = await messages.create({
    content: "Root",
    parentId: null
  });

  console.log(message)

  createDefaultStickies(message.id);

  await messages.create({
    content: "Write something!",
    parentId: message.id
  });

  return message;
}

exports.create = async (request, response) => {
  if (!request.body.content) {
    response.status(400).send({
      message: "Bad request - no content provided"
    });

    return;
  }

  if (request.body.content.length > 140) {
    response.status(400).send({
      message: "Bad request - message content too long"
    });

    return;
  }

  const parentMessage = await messages.findOne({
      where: {
        id: request.params.id
      }
    });

  if (parentMessage === null) {
    response.status(400).send({
      message: "Bad request - parent message doesn't exist"
    });
  }

  if (parentMessage.sticky) {
    response.status(400).send({
      message: "Bad request - can't reply to a sticky"
    });
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
    .then(async (data) => {
      if (data === null) {
        response.send(await createRoot());
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
