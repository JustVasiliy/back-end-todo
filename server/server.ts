require("dotenv").config();

import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as cors from "@koa/cors";
import * as mongoose from "mongoose";
mongoose.connect(`${process.env.URL_MONGO}`);

const app: Koa = new Koa();
const routers = require("../controllers /index");

const errorHendler = require("../service /catchError");

app.use(cors());
app.use(bodyParser());

app.use(routers.routes()).use(routers.allowedMethods());
app.use(errorHendler);

app.listen(3000, function () {
  console.log("Server running on https://localhost:3000");
});
