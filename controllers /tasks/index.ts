const { todos } = require("./get");
const { create } = require("./create");
const { put } = require("./put");
const { remove } = require("./delete");
import * as Koa from "koa";
const KoaRouter = require("koa-router");
const router = new KoaRouter({ prefix: "/task" });

const jwtVerification = require("../../service /jwt");

router.use(jwtVerification);
router.get(
  "/get",
  async (ctx: Koa.Context) => {
    await todos(ctx);
  },
  jwtVerification
);
router.post("/create", async (ctx: Koa.Context) => {
  await create(ctx);
});
router.put("/put", async (ctx: Koa.Context) => {
  await put(ctx);
});
router.delete("/delete", async (ctx: Koa.Context) => {
  await remove(ctx);
});
module.exports = router;
