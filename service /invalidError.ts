import * as Koa from "koa";
module.exports = {
  invalidError: function (ctx: Koa.Context) {
    ctx.response.status = 401;
    ctx.body = JSON.stringify({
      success: false,
      message: "Invalid token",
    });
  },
};
