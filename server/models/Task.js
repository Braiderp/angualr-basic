const { Schema, model } = require("mongoose");
const schema = Schema({
  title: { type: String, reqired: true },
  isDone: { type: Boolean }
});

module.exports = model("Task", schema);
