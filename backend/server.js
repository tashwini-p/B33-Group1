const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.db = router.db;

// Set up the authentication middleware
server.use(middlewares);
server.use(router);

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`JSON Server with authentication is running on port ${port}`);
});