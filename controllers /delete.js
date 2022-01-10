const jwt = require('jsonwebtoken');
const User = require('../schemas/userShema.js');
const Task = require('../schemas/tasksSchema.js');
const resEnd = require('../service /resEnd.js');

module.exports = {
    delete: async function(req, res){
        let bodyDelete = "";
        const header = req.headers.authorization;
        const headerAuth = jwt.decode(header);
        if (headerAuth !== null) {
          const userFind = await User.User.find({ id: headerAuth.id });
          //user will need authorization after 15 minutes
          if (
            userFind[0] !== undefined &&
            Date.now() / 1000 - headerAuth.exp <= 900
          ) {
        req.on("data", async (chunk) => {
          bodyDelete += chunk;
          bodyDelete = JSON.parse(bodyDelete);
          await Task.Task.update({ id: bodyDelete.id }, { deleted: true });
        });
        
        res.end(resEnd.resEnd(req.method));
      } else {
        res.statusCode = 401;
        res.statusMessage = 'Invalid token'
        res.end(
          JSON.stringify({
            success: false,
            message: "Invalid token",
            
          })
        );
      }
    } else {
      res.statusCode = 401;
      res.statusMessage = 'Invalid token'
      res.end(
        JSON.stringify({
          success: false,
          message: "Invalid token",
          
        })
      );
    }
    }
}