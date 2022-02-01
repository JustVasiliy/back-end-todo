const { newUser } = require("./registration.js");

const KoaRouter = require("koa-router");
const router = new KoaRouter();

router.post("/registration", async (ctx) => {
  await newUser(ctx);
});

module.exports = router;
