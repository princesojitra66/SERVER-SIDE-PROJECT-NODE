const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let todos = [];
let idCounter = 1;

app.get('/', (req, res) => {
  res.redirect('/todoapp');
});

app.get('/todoapp', (req, res) => {
  console.log('Rendering todoapp....');
  res.render('todoapp', { todos });
});

// Create
app.post('/add', (req, res) => {
  console.log('Adding new todo...');
  const { task } = req.body;
  if (task.trim()) {
    todos.push({ id: idCounter++, task, completed: false });
    console.log(`Added task: "${task}"`);
  }
  res.redirect('/todoapp');
});

// Complete
app.post('/complete/:id', (req, res) => {
  console.log(` completion ${req.params.id}`);
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = req.body.completed === 'on';
  }
  res.redirect('/todoapp');
});

// Edit form
app.get('/edit/:id', (req, res) => {
  console.log(` Rendering edit form.... ${req.params.id}`);
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.redirect('/todoapp');
  }
  res.render('edit', { todo });
});

// Update 
app.post('/edit/:id', (req, res) => {
  console.log(` Updating task ${req.params.id}`);
  const id = parseInt(req.params.id);
  const newTask = req.body.task;
  const todo = todos.find(t => t.id === id);
  if (todo && newTask.trim()) {
    todo.task = newTask;
  }
  res.redirect('/todoapp');
});

// Delete
app.post('/delete/:id', (req, res) => {
  console.log(`Deleting task ${req.params.id}`);
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  console.log(`Task ${id} deleted`);
  res.redirect('/todoapp');
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
  console.log('Saver started....');
});
