const express = require("express");
const bodyParser = require("body-parser");
const properties = require("./config/properties-config");
const routes = require("./routes/index");

class Server {
  constructor() {
    this.app = null;
  }
  start() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.listen(process.env.PORT || properties.PORT, (req, res) => {
      console.log(`Server is running on ${properties.PORT} port.`);
    });

    this.app.use("/", routes);
  }
}

let server = new Server();
server.start();
