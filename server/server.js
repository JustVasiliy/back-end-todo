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

http
  .createServer(async (req, res) => {
    res.writeHead(200, defaultHeaders);
    switch (req.url) {
      case "/todos":
        const result = await Item.find( { deleted: false });
        await res.end( JSON.stringify(result));

        break;
      case "/create":
        let bodyCreate = "";
        req.on("data", async(chunk) => {
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

          await Todo.save();
        });

        res.end("create");

        break;

      case "/delete":
        let bodyDelete = "";
        req.on("data", async (chunk) => {
          bodyDelete += chunk;
          bodyDelete = JSON.parse(bodyDelete);
          const result = await Item.update(
            { id: bodyDelete.id },
            { deleted: true }
          );
          await res.end(JSON.stringify(result));
        });

        res.end("delete");
        break;

      case "/put":
        let body = "";
        req.on("data", async (chunk) => {
          body += chunk;
          body = JSON.parse(body);
          const result = await Item.update({ id: body.id }, body);
          await res.end(JSON.stringify(result));
        });

        res.end("Changed");

        break;
    }
  })
  .listen(3000);
