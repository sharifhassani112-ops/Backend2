import Todo from "../models/todo.model.js";
import User from "../models/User.js";

export async function getAllTodos(req, res) {
  const todos = await Todo.find();
  res.status(201).send(todos);
}

export async function createTodo(req, res) {
  const { task } = req.body;
  if (!task) {
    res.status(400).send({ message: " Id and Task are  requird!" });
  }

  const newtodo = await Todo.create({ task });
  res.status(201).send({ message: "Todo Created Successfuly!", newtodo });
}

export async function updateTodo(req, res) {
  const { id } = req.params;
  const { task } = req.body;
  const updateTodo = await Todo.findByIdAndUpdate(id, { task });
  res.status(200).send({ message: "Todo Updated Successfully!", updateTodo });
}
export async function deleteTodo(req, res) {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.status(200).send({ message: "Todo Deleted Successfuly!" });
}