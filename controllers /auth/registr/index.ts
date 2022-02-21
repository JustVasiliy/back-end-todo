const { newUser } = require("./registration");

const KoaRouter = require("koa-router");
import * as Koa from "koa";
const router = new KoaRouter();

router.post("/registration", async (ctx: Koa.Context) => {
  await newUser(ctx);
});

module.exports = router;
