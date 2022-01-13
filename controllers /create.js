const jwt = require('jsonwebtoken');
const User = require('../schemas/userShema.js');
const Task = require('../schemas/tasksSchema.js');
const resEnd = require('../service /resEnd.js');
const invalid = require('../service /invalidError.js');
module.exports = {
    create: async function(req, res){
      
        let bodyCreate = "";
        const header = req.headers.authorization;
        const headerAuth = jwt.decode(header);
        
        if (headerAuth !== null) {
          const userFind = await User.User.find({ id: headerAuth.id });
          //user will need authorization after 15 minutes
          if (userFind[0] !== undefined && (Date.now()/1000 - headerAuth.exp) <= 900) {
            req.on("data", (chunk) => {
              bodyCreate += chunk;
             
              if(bodyCreate === undefined){
                return false
              }
              bodyCreate = JSON.parse(bodyCreate);

              bodyCreate.id = new Date();
              
              const token = jwt.decode(bodyCreate.token);
              
              const Todo = new Task.Task({
                name: bodyCreate.name,
                checked: bodyCreate.checked,
                deleted: bodyCreate.deleted,
                editing: bodyCreate.editing,
                id: bodyCreate.id,
                nickname: token.id
              });
              
              Todo.save();
              
              res.end(resEnd.resEnd(req.method));
            });
          }else {
            invalid.invalidError(res, 401);
          }
        }else {
          invalid.invalidError(res, 401);
        }
        
    
        
    }  
    
}