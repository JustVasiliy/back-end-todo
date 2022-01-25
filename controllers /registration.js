const User = require("../schemas/userShema.js");
const resEnd = require("../service /resEnd.js");
const jwt = require("jsonwebtoken");
module.exports = {
  newUser: async function (ctx) {
    let token = "";

    bodyNewUser = ctx.request.body;

    const findUser = await User.User.find({ nickname: bodyNewUser.nickname });
    if (findUser[0] === undefined) {
      const userInfo = {
        nickname: bodyNewUser.nickname,
        id: bodyNewUser.id,
        exp: Date.now() / 1000,
      };
      token = jwt.sign(userInfo, "myKey");
      let user = new User.User({
        name: bodyNewUser.name,
        surname: bodyNewUser.surname,
        nickname: bodyNewUser.nickname,
        password: bodyNewUser.password,
        id: bodyNewUser.id,
      });
      user.save();
    } else {
      token = "This nickname already exists";
    }
    ctx.body = token;
  },
};
