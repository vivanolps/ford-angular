const http = require("http");
const app = require("./config/express");

http.createServer(app).listen(3001, function () {
  console.log("Servidor escutando na porta: " + this.address().port);
});
