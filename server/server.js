const http = require("http");

const getTodos = require("../controllers /get.js");
const create = require("../controllers /create.js");
const put = require("../controllers /put.js");
const remove = require("../controllers /delete.js");
const newUser = require("../controllers /registration.js");
const authorization = require('../controllers /authorization.js');
const defaultHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET,DELETE, PUT",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://VasiliyBuriy:forWorkVB2001@cluster0.6qwii.mongodb.net/todo-items?retryWrites=true&w=majority"
);

http
  .createServer(async (req, res) => {
    res.writeHead(200, defaultHeaders);
    switch (req.url) {

      case "/get":
        getTodos.todos(req, res);
        break;

      case "/create":
        create.create(req, res);
        break;

      case "/delete":
        remove.delete(req, res);
        break;

      case "/put":
        put.put(req, res);
        break;

      case "/registration":
        newUser.newUser(req, res);
        break;

      case "/authorization":
        authorization.authorization(req, res);
        break;
      
    }
  })
  .listen(3000);

//ошибки в файлах авторизации и тудус 