"use strict";
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
const routers = require("../controllers /index.js");
const errorHendler = require("../service /catchError");
app.use(cors(defaultHeaders));
app.use(bodyParser());
app.use(routers.routes()).use(routers.allowedMethods());
app.use(errorHendler);
app.listen(3000, function () {
  console.log("Server running on https://localhost:3000");
});
const text = "text";
// module.exports = app;
