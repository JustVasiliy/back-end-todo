import { Schema, model } from "mongoose";
import { TaskSchema } from "../service /types";
const Task = new Schema<TaskSchema>({
  name: String,
  checked: Boolean,
  deleted: Boolean,
  id: String,
  createdBy: String,
});
const Model = model;

module.exports = {
  Task: Model("todo-items", Task),
};
