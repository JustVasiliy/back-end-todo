import * as Koa from "koa";
module.exports = async function (ctx: Koa.Context, next: Koa.Next) {
  try {
    await next();
  } catch (err: any) {
    console.log("here");
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = JSON.stringify({
      message: "error",
      error: err.message,
    });
  }
};
