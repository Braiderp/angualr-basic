const express = require("express");
const Task = require("../models/Task");
const router = express.Router();
router.get("/tasks", async (req, res, next) => {
  try {
    const tasks = await Task.find().exec();
    res.jsonp(tasks);
  } catch (error) {
    res.jsonp(error).status(500);
  }
});

router.get("/task/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id).exec();
    res.jsonp(task);
  } catch (error) {
    res.jsonp(error).status(500);
  }
});

router.post("/task", async (req, res, next) => {
  try {
    console.log("hit", req.body);

    const { title, isDone } = req.body;
    if (!title) {
      throw new Error("there was no title!!!!");
    }
    const task = new Task({ title, isDone: isDone ? isDone : false });
    const savedTask = await task.save().then(task => {
      return task;
    });
    return res.jsonp(savedTask);
  } catch (error) {
    console.log("error: ", error);
    res.jsonp(error).status(500);
  }
});

router.delete("/task/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw "no id passed";
    }
    const task = await Task.findByIdAndRemove(id).exec();
    res.jsonp(task);
  } catch (error) {
    res.jsonp(error).status(500);
  }
});

router.put("/task/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw "no id passed";
    }
    const { title, isDone } = req.body;
    const task = { title, isDone: isDone ? isDone : false };

    await Task.updateOne({ _id: id }, task).exec();
    return res.jsonp({ message: "updated" });
  } catch (error) {
    res.jsonp(error).status(500);
  }
});
module.exports = router;
