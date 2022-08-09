const express = require("express");
const router = express.Router();
const ToDo = require("../models/ToDo");
const requiresAuth = require("../middleware/permissions");

// @route  GET api/todos/test
// @desc   Tests todos route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Todos Works" }));

// @route  POST api/todos/new
// @desc   Create a new todo
// @access Private
router.post("/new", requiresAuth, async (req, res) => {
  try {
    // create new todo
    const newToDo = new ToDo({
      user: req.user.id,
      content: req.body.content,
      complete: false,
    });

    // save new todo
    await newToDo.save();
    return res.json(newToDo);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
