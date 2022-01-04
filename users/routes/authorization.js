const User = require('../../users/userShema.js');
const jwt = require("jsonwebtoken");

module.exports = {
    authorization: function(req,res){
        let bodyAuth = "";
        let token = "";
        req.on("data", async (chunk) => {
          bodyAuth += chunk;
          bodyAuth = JSON.parse(bodyAuth);

          const findUser = await User.User.find(bodyAuth);
          // const findUser = [1];
          
          if (findUser[0] !== undefined) {
            const userInfo = {nickname: bodyAuth.nickname, exp: Date.now()/1000}
            token = jwt.sign(userInfo, "myKey");
        
          }else{
            token = "You need registration!";
          }
        });

        setTimeout(() => res.end(token), 500);
    }
}