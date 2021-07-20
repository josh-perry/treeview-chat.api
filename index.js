const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:8080",
    "https://treeview-chat-web.herokuapp.com"
  ]
};

app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 15*60*1000,
  max: 150
});

app.use(limiter);

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();

require("./routes/message.js")(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
