const server = require("./server/server.js");
const port = process.env_PORT || 5000;

server.listen(port, () => {
  console.log("\n==RUNNING ON 5000==\n");
});
