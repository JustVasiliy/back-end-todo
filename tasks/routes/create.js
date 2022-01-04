const jwt = require('jsonwebtoken');
const User = require('../../users/userShema.js');
const Task = require('../tasksSchema.js');
const resEnd = require('../../server/resEnd.js');
module.exports = {
    create: function(req, res){
        let bodyCreate = "";
        req.on("data", (chunk) => {
          bodyCreate += chunk;
          bodyCreate = JSON.parse(bodyCreate);
          bodyCreate.id = new Date();
          
          const token = jwt.decode(bodyCreate.token);
         
          const Todo = new Task.Task({
            name: bodyCreate.name,
            checked: bodyCreate.checked,
            deleted: bodyCreate.deleted,
            editing: bodyCreate.editing,
            id: bodyCreate.id,
            nickname: token.nickname
          });
          
          Todo.save();
        });
    
        res.end(resEnd.resEnd(req.method));
    }  
    
}