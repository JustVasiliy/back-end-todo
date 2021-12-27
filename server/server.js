const http = require("http");

const defaultHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET,DELETE, PUT",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://VasiliyBuriy:forWorkVB2001@cluster0.6qwii.mongodb.net/todo-items?retryWrites=true&w=majority"
);
const Schema = mongoose.Schema;
const Task = new Schema({
  name: String,
  checked: Boolean,
  deleted: Boolean,
  editing: Boolean,
  id: Number,
});
const Model = mongoose.model;
const Item = Model("todo-items", Task);
function resEnd(method) {
  let code;
  let objResp;
  if (method === "PUT") {
    code = 201;
    objResp = { editing: true };
  } else if (method === "DELETE") {
    code = 201;
    objResp = { deleted: true };
  } else if (method === "POST") {
    code = 200;
    objResp = { success: true };
  }
  return JSON.stringify({ status: code, result: objResp });
}

http
  .createServer(async (req, res) => {
    res.writeHead(200, defaultHeaders);
    switch (req.url) {
      case "/todos":
        const getTodos = async function getTodos() {
          const result = await Item.find({ deleted: false });
          await res.end(JSON.stringify(result));
        };
        await getTodos();

        break;
      case "/create":
        let bodyCreate = "";
        await req.on("data", (chunk) => {
          bodyCreate += chunk;
          bodyCreate = JSON.parse(bodyCreate);
          bodyCreate.id = new Date();
          const Todo = new Item({
            name: bodyCreate.name,
            checked: bodyCreate.checked,
            deleted: bodyCreate.deleted,
            editing: bodyCreate.editing,
            id: bodyCreate.id,
          });

          Todo.save();
        });

        res.end(resEnd(req.method));

        break;

      case "/delete":
        let bodyDelete = "";
        await req.on("data", async (chunk) => {
          bodyDelete += chunk;
          bodyDelete = JSON.parse(bodyDelete);
          await Item.update({ id: bodyDelete.id }, { deleted: true });
        });

        res.end(resEnd(req.method));
        break;

      case "/put":
        let body = "";
        await req.on("data", async (chunk) => {
          body += chunk;
          body = JSON.parse(body);
          await Item.update({ id: body.id }, body);
        });

        res.end(resEnd(req.method));

        break;
    }
  })
  .listen(3000);
