const db = require("./models");

console.log("Wiping message table");

db.messages.destroy({
  where: {}
})
.then(result => {
  console.log("Done");
  process.exit(0);
})
.catch(error => {
  console.error(error);
  process.exit(1);
});
