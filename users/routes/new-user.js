const User = require('../userShema.js');
const resEnd = require('../../server/resEnd.js');
const jwt = require("jsonwebtoken");
module.exports = {
    newUser: function(req, res){
        let bodyNewUser = "";
        let token = "u";
        req.on("data", async (chunk) => {
          bodyNewUser += chunk;
          bodyNewUser = JSON.parse(bodyNewUser);
          bodyNewUser.id = new Date();
          const findUser = await User.User.find({nickname : bodyNewUser.nickname});
          
          if(findUser[0] === undefined){
            const userInfo = {nickname: bodyNewUser.nickname, "exp": Date.now()/1000}
            token = jwt.sign(userInfo, "myKey");
            let user = new User.User({ 
              name:  bodyNewUser.name,
              surname:  bodyNewUser.surname,
              nickname:  bodyNewUser.nickname,
              password:  bodyNewUser.password,
              id:  bodyNewUser.id,});
              user.save();
          }else{
              token = "You need registration!";
          }
          }
          );
        setTimeout(() => res.end(token), 500);
        
    }
}