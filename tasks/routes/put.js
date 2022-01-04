const jwt = require('jsonwebtoken');
const User = require('../../users/userShema.js');
const Task = require('../tasksSchema.js');
const resEnd = require('../../server/resEnd.js');

module.exports = {
    put: function (req, res){
        let body = "";
        req.on("data", async (chunk) => {
          body += chunk;
          body = JSON.parse(body);
          await Task.Task.update({ id: body.id }, body);
        });

        res.end(resEnd.resEnd(req.method));
    }
}