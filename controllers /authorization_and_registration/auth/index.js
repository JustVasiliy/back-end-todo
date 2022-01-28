const authorization = require("./authorization.js");

const KoaRouter = require("koa-router");
const router = new KoaRouter();

router.post('/api/authorization', async (ctx)=> {
    await authorization.authorization(ctx);
});

module.exports = router;