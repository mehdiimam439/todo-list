import express from "express";
import bodyParser from "body-parser";
import open from "open";

const app = express();
const port = 3000;
const url = `http://localhost:${port}`;

var lists = [
  { name: "Daily", list: [] },
  { name: "General", list: [] },
];
var currentList = 0;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/daily");
});

app.get("/daily", (req, res) => {
  currentList = 0;
  res.render("todo.ejs", { currentList: lists[currentList] });
});

app.get("/general", (req, res) => {
  currentList = 1;
  res.render("todo.ejs", { currentList: lists[currentList] });
});

app.post("/add", (req, res) => {
  lists[currentList].list.push({
    desc: req.body.task,
    checked: false,
  });
  res.redirect(lists[currentList].name);
});

app.post("/check", (req, res) => {
  lists[currentList].list[req.body.index].checked ^= 1;
  res.redirect(lists[currentList].name);
});

app.post("/delete", (req, res) => {
  lists[currentList].list.splice(req.body.index, 1);
  res.redirect(lists[currentList].name);
});

app.listen(port, () => {
  console.log(url);
});

open(url);
