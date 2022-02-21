require("dotenv").config();

const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
// import * as mongoose from "mongoose";
const mongoose = require("mongoose");
mongoose.connect(`${process.env.URL_MONGO}`);
// mongoose.disconnect()
const app = new Koa();
const routers = require("../controllers /index");

const errorHendler = require("../service /catchError");

app.use(cors());
app.use(bodyParser());

app.use(routers.routes()).use(routers.allowedMethods());
app.use(errorHendler);
console.log(1);
const server = app.listen(3000, function () {
  console.log("Server running on http://localhost:3000");
});
server.close();
module.exports = app;
