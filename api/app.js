import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Todo from "./models/todo.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.get("/api", async (req, res) => {
  try {
    const data = await Todo.find();
    try {
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/api/:id", async (req, res) => {
  try {
    // console.log(req.params.id);
    const todo = await Todo.findById(req.params.id);
    // console.log(todo);
    res.status(200).json(todo);
  } catch (err) {
    res.status(200).json(err);
  }
});

app.post("/api", async (req, res) => {
  try {
    // console.log(req.body);
    const newTodo = new Todo({
      title: req.body.title,
      todoDate: req.body.todoDate,
    });
    try {
      const savedTodo = await newTodo.save();
      res.status(200).json(savedTodo);
    } catch (error) {
      res.status(401).json(error);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put("/api/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body);
    try {
      res.status(200).json(updatedTodo);
    } catch (error) {
      res.status(400).json(error);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete("/api/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    try {
      await Todo.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Todo deleted!" });
    } catch (err) {
      res.status(404).json({ message: "Todo not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
});

const db_url = "mongodb://localhost/tododb";

mongoose
  .connect(db_url)
  .then(app.listen(3001, () => console.log(`Server Started...`)))
  .catch((err) => console.log(err));
