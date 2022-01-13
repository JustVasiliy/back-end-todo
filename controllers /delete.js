const jwt = require('jsonwebtoken');
const User = require('../schemas/userShema.js');
const Task = require('../schemas/tasksSchema.js');
const resEnd = require('../service /resEnd.js');
const invalid = require('../service /invalidError.js');
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
          await Task.Task.update({ id: bodyDelete.id,nickname:userFind[0].id }, { deleted: true });
        });
        
        res.end(resEnd.resEnd(req.method));
      } else {
        invalid.invalidError(res, 401);
        
      }
    } else {
      invalid.invalidError(res, 401);
      
    }
    }
}