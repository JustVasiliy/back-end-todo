const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Task = new Schema({
  name: String,
  checked: Boolean,
  deleted: Boolean,
  editing: Boolean,
  id: Number,
  createdBy: String
});
const Model = mongoose.model;

module.exports = {
    Task: Model("todo-items", Task),
}

