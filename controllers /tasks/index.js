const { todos } = require("./get.js");
const { create } = require("./create.js");
const { put } = require("./put.js");
const { remove } = require("./delete.js");
const KoaRouter = require("koa-router");
const router = new KoaRouter({ prefix: "/task" });

const jwtVerification = require("../../service /jwt");

router.use(jwtVerification);
router.get(
  "/get",
  async (ctx) => {
    await todos(ctx);
  },
  jwtVerification
);
router.post("/create", async (ctx) => {
  await create(ctx);
});
router.put("/put", async (ctx) => {
  await put(ctx);
});
router.delete("/delete", async (ctx) => {
  await remove(ctx);
});
module.exports = router;
