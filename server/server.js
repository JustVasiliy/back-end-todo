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
  .createServer((req, res) => {
    res.writeHead(200, defaultHeaders);
    switch (req.url) {
      case "/todos":
        setTimeout(()=>Item.find({ deleted: false }).then((result) => {
          res.end(JSON.stringify(result))
        }), 200)

        break;
      case "/create":
        let bodyCreate = "";
        req.on("data", (chunk) => {
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

        res.end("create");
        break;

      case "/delete":
        let bodyDelete = "";
        req.on("data", (chunk) => {
          bodyDelete += chunk;
          bodyDelete = JSON.parse(bodyDelete);

          Item.update({ id: bodyDelete.id }, { deleted: true }).then(
            (res) => res
          );
        });

        res.end("delete");
        break;
      case "/checked":
        let bodyChecked = "";
        req.on("data", (chunk) => {
          bodyChecked += chunk;
          bodyChecked = JSON.parse(bodyChecked);

          Item.update({ id: bodyChecked.id }, { checked: true }).then(
            (res) => res
          );
        });
        // Item.update({ id: bodyChecked.id }, { checked: false })
        // .then(res=>res)});

        res.end("checked");
        break;

      case "/editing":
        let bodyEditing = "";
        req.on("data", (chunk) => {
          bodyEditing += chunk;
          bodyEditing = JSON.parse(bodyEditing);

          Item.update({ id: bodyEditing.id }, { editing: true }).then(
            (res) => res
          );
        });

        res.end("editing");
        break;

      case "/change":
        let bodyChange = "";
        req.on("data", (chunk) => {
          bodyChange += chunk;
          bodyChange = JSON.parse(bodyChange);

          Item.update({ id: bodyChange.id }, { editing: false }).then(
            (res) => res
          );
          if (bodyChange.name !== undefined) {
            Item.update({ id: bodyChange.id }, { name: bodyChange.name }).then(
              (res) => res
            );
          }
        });

        res.end("Changed");
        break;
    }
  })
  .listen(3000);
