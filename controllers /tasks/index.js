const getTodos = require("./get.js");
const create = require("./create.js");
const put = require("./put.js");
const remove = require("./delete.js");
const KoaRouter = require("koa-router");
const router = new KoaRouter();

const jwtVerification = require('../../service /jwt');

router.use(jwtVerification);
router.get('/api/task/get', async (ctx)=>{
    await getTodos.todos(ctx);
}, jwtVerification);
router.post('/api/task/create', async (ctx)=> {
    await create.create(ctx);
});
router.put('/api/task/put', async (ctx)=> {
    await put.put(ctx);
});
router.delete('/api/task/delete', async (ctx)=>{
    await remove.delete(ctx);
})
module.exports = router;