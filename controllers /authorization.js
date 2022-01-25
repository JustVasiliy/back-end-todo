const User = require("../schemas/userShema.js");
const jwt = require("jsonwebtoken");

module.exports = {
  authorization: async function (ctx) {
    const bodyRequest = ctx.request.body;
    const findUser = await User.User.find(bodyRequest);
    let token;
    if (findUser[0] !== undefined) {
      const userInfo = {
        nickname: bodyRequest.nickname,
        id: findUser[0].id,
        exp: Date.now() / 1000,
      };
      token = jwt.sign(userInfo, "myKey");
    } else {
      token = "You need registration!";
    }

    ctx.body = token;
  },
};
