const jwt = require("jsonwebtoken");

const getTodos = require("../../service /getTodos")
module.exports = {
  todos: async function (ctx) {
    const header = ctx.request.headers.authorization;
    const headerAuth = jwt.decode(header);
    
    await getTodos(headerAuth, ctx);
  },
};
