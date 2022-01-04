const jwt = require('jsonwebtoken');
const User = require('../../users/userShema.js');
const Task = require('../tasksSchema.js');
const resEnd = require('../../server/resEnd.js');

module.exports = {
    delete: function(req, res){
        let bodyDelete = "";
        req.on("data", async (chunk) => {
          bodyDelete += chunk;
          bodyDelete = JSON.parse(bodyDelete);
          await Task.Task.update({ id: bodyDelete.id }, { deleted: true });
        });

        res.end(resEnd.resEnd(req.method));
    }
}