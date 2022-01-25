const http = require("http");

const getTodos = require("../controllers /get.js");
const create = require("../controllers /create.js");
const put = require("../controllers /put.js");
const remove = require("../controllers /delete.js");
const newUser = require("../controllers /registration.js");
const authorization = require("../controllers /authorization.js");
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
const Koa = require("koa");
const KoaRouter = require("koa-router");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");

const app = new Koa();
const router = new KoaRouter();
app.use(cors(defaultHeaders));
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

router.get("/get", async (ctx) => {
  await getTodos.todos(ctx);
});
router.post("/create", async (ctx) => {
  await create.create(ctx);
});
router.put("/put", async (ctx) => {
  await put.put(ctx);
});
router.delete("/delete", async (ctx) => {
  await remove.delete(ctx);
});
router.post("/authorization", async (ctx) => {
  await authorization.authorization(ctx);
});
router.post("/registration", async (ctx) => {
  await newUser.newUser(ctx);
});

app.listen(3000, function () {
  console.log("Server running on https://localhost:3000");
});
