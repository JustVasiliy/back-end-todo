const registration = require("./registration.js");

const KoaRouter = require("koa-router");
const router = new KoaRouter();

router.post('/api/registration', async (ctx)=> {
    await registration.newUser(ctx);
});

module.exports = router;