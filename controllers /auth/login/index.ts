const { authorization } = require("./authorization");
const KoaRouter = require("koa-router");
import * as Koa from "koa";
const router = new KoaRouter();

router.post("/authorization", async (ctx: Koa.Context) => {
  await authorization(ctx);
});

module.exports = router;
