const { authorization } = require("./authorization.js");

const KoaRouter = require("koa-router");
const router = new KoaRouter();

router.post("/authorization", async (ctx) => {
  await authorization(ctx);
});

module.exports = router;
