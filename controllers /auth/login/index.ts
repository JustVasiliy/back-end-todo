const { authorization } = require("./authorization");
import * as KoaRouter from "koa-router";
import * as Koa from "koa";
const router: KoaRouter = new KoaRouter();

router.post("/authorization", async (ctx: Koa.Context) => {
  await authorization(ctx);
});

module.exports = router;
