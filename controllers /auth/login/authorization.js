const User = require("../../../schemas/userShema.js");
const jwt = require("jsonwebtoken");
const jwtExpDate = require("../../../service /jwtExpDate");
module.exports = {
  authorization: async function (ctx) {
    const bodyRequest = ctx.request.body;
    const findUser = await User.User.find(bodyRequest);

    let token;
    if (
      findUser[0] !== undefined &&
      bodyRequest.nickname.trim() !== "" &&
      bodyRequest.nickname.trim() !== ""
    ) {
      const userInfo = {
        nickname: bodyRequest.nickname,
        id: findUser[0].id,
      };
      token = jwt.sign(userInfo, "myKey", { expiresIn: jwtExpDate(15) });
    } else {
      token = "You need registration!";
    }

    ctx.body = token;
  },
};
