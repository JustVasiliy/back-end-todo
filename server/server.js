require("dotenv").config();
const defaultHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET,DELETE, PUT",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};
const mongoose = require("mongoose");
mongoose.connect(process.env.URL_MONGO);
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");

const app = new Koa();
const routerTasks = require("../controllers /tasks/index.js");
const routerAuth = require("../controllers /authorization_and_registration/auth/index.js");
const routerRegistr = require("../controllers /authorization_and_registration/registr/index.js");

const errorHendler = require("../service /catchError");

app.use(cors(defaultHeaders));
app.use(bodyParser());

app.use(routerTasks.routes()).use(routerTasks.allowedMethods());
app.use(routerAuth.routes()).use(routerAuth.allowedMethods());
app.use(routerRegistr.routes()).use(routerRegistr.allowedMethods());
app.use(errorHendler);

app.listen(3000, function () {
  console.log("Server running on https://localhost:3000");
});
