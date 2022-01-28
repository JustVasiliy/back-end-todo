module.exports = {
  invalidError: function (ctx) {
    ctx.response.status = 401;
    ctx.body = JSON.stringify({
      success: false,
      message: "Invalid token",
    });
  },
};
