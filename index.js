import express from "express";
import bodyParser from "body-parser";
import open from "open";

const app = express();
const port = 3000;
const url = `http://localhost:${port}`;

var lists = [];
lists["Daily"] = [
  ["stuffA", true],
  ["stuffB", false],
];

//   { name: "Daily", list: [] },
//   { name: "General", list: [] },
// ];
var currentList = "Daily";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("todo.ejs", { currentList: currentList, lists: lists });
});

app.post("/", (req, res) => {
  currentList = req.body.index;
  res.redirect("/");
});

app.post("/add_list", (req, res) => {
  if (req.body.listName) lists.push({ name: req.body.listName, list: [] });
  res.redirect("/");
});

app.post("/delete_list", (req, res) => {
  if (lists.length > 1) {
    if (req.body.index === currentList) {
      req.body.index === 0 ? currentList++ : currentList--;
    }
    lists = lists.filter((item) => item.name !== req.body.listName);
  }
  res.redirect("/");
});

app.post("/add", (req, res) => {
  lists[currentList].list.push({
    desc: req.body.task,
    checked: false,
  });
  res.redirect("/");
});

app.post("/check", (req, res) => {
  lists[currentList][req.body.index][1] ^= 1;
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  lists[currentList].list.splice(req.body.index, 1);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(url);
});

//open(url);
