const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

let volunteers = [];
let nextId = 1;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    console.log("Rendering index with volunteers");
  res.render("index", { volunteers });
});

app.get("/add", (req, res) => {
    console.log("Rendering addVolunteer page");
  res.render("addVolunteer");
});

app.post("/add", (req, res) => {
  const { name, email, phone, skills } = req.body;
  const newVolunteer = {
    id: nextId++,
    name,
    email,
    phone,
    skills,
  };
  volunteers.push(newVolunteer);
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    console.log("Editing volunteer with ID:", req.params.id);
  const id = parseInt(req.params.id);
  const volunteer = volunteers.find((v) => v.id === id);
  if (!volunteer) return res.send("Volunteer not found");
  res.render("editVolunteer", { volunteer });
});

app.post("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, phone, skills } = req.body;
  const volunteer = volunteers.find((v) => v.id === id);
  if (volunteer) {
    volunteer.name = name;
    volunteer.email = email;
    volunteer.phone = phone;
    volunteer.skills = skills;
  }
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
    console.log("Deleting volunteer with ID:", req.params.id);
  const id = parseInt(req.params.id);
  volunteers = volunteers.filter((v) => v.id !== id);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log("server started......")
});
