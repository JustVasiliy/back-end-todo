const http = require("http");

const todos = require("../tasks/routes/todos.js");
const create = require("../tasks/routes/create.js");
const put = require("../tasks/routes/put.js");
const remove = require("../tasks/routes/delete.js");
const newUser = require("../users/routes/new-user.js");
const authorization = require('../users/routes/authorization.js');
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

      case "/todos":
        todos.todos(req, res);
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

      case "/new-user":
        newUser.newUser(req, res);
        break;

      case "/authorization":
        authorization.authorization(req, res);
        break;
      
    }
  })
  .listen(3000);

//ошибки в файлах авторизации и тудус 