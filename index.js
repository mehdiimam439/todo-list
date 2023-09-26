import express from "express";
import bodyParser from "body-parser";
import open from "open";

const app = express();
const port = 3000;
const url = `http://localhost:${port}`;

var lists = [
  [
    "Daily",
    [
      ["Do homework", true],
      ["Feed cat", false],
    ],
  ],
  [
    "General",
    [
      ["Adopt cat", false],
      ["Graduate", true],
    ],
  ],
];

var currentListIndex = 0;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("todo.ejs", { lists: lists, currentListIndex: currentListIndex });
});

app.post("/add_task", (req, res) => {
  lists[currentListIndex][1].push([req.body.taskName, false]);
  res.redirect("/");
});

app.post("/check_task", (req, res) => {
  lists[currentListIndex][1][req.body.index][1] ^= 1;
  res.redirect("/");
});

app.post("/delete_task", (req, res) => {
  lists[currentListIndex][1].splice(req.body.index, 1);
  res.redirect("/");
});

app.post("/add_list", (req, res) => {
  if (req.body.listName) lists.push([req.body.listName, []]);
  res.redirect("/");
});

app.post("/select_list", (req, res) => {
  currentListIndex = req.body.index;
  res.redirect("/");
});

app.post("/delete_list", (req, res) => {
  if (lists.length > 1) {
    lists.splice(req.body.index, 1);
    if (req.body.index === currentListIndex) {
      currentListIndex = 0;
    }
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(url);
});

open(url);
