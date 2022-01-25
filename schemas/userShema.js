const mongoose = require("mongoose");
const SchemaUser = mongoose.Schema;
const Person = new SchemaUser({
  name: String,
  surname: String,
  nickname: String,
  password: String,
  id: String,
  
});
const Model = mongoose.model;
module.exports = {
    User: Model("users", Person),
}




