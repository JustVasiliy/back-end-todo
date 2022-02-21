const KoaRouter = require ("koa-router");
const router = new KoaRouter({ prefix: "/api" });

const routerTasks = require("./tasks/index");
const routerAuth = require("./auth/login/index");
const routerRegistr = require("./auth/registr/index");

router.use(routerTasks.routes()).use(routerTasks.allowedMethods());
router.use(routerAuth.routes()).use(routerAuth.allowedMethods());
router.use(routerRegistr.routes()).use(routerRegistr.allowedMethods());

module.exports = router;
