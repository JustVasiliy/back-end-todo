import { Schema as SchemaUser } from "mongoose";
import { model } from "mongoose";
import { UserSchema } from "../service /types";
const Person = new SchemaUser<UserSchema>({
  name: String,
  surname: String,
  nickname: String,
  password: String,
  id: String,
});
const Model = model;
module.exports = {
  User: Model("users", Person),
};
