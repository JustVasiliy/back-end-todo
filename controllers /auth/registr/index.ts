const { newUser } = require("./registration");

import * as KoaRouter from "koa-router";
import * as Koa from "koa";
const router: KoaRouter = new KoaRouter();

router.post("/registration", async (ctx: Koa.Context) => {
  await newUser(ctx);
});

module.exports = router;
