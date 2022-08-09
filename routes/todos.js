const express = require("express");
const router = express.Router();
const ToDo = require("../models/ToDo");
const requiresAuth = require("../middleware/permissions");
const validateToDoInput = require("./validation/toDoValidation");

// @route  GET api/todos/test
// @desc   Tests todos route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Todos Works" }));

// @route  POST api/todos/new
// @desc   Create a new todo
// @access Private
router.post("/new", requiresAuth, async (req, res) => {
  try {
    const { errors, isValid } = validateToDoInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // create new todo
    const newToDo = new ToDo({
      user: req.user._id,
      content: req.body.content,
      complete: false,
    });

    // save new todo
    await newToDo.save();
    return res.json(newToDo);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

// @route  GET api/todos/current
// @desc   Current user todo
// @access Private
router.get("/current", requiresAuth, async (req, res) => {
  try {
    const completeToDos = await ToDo.find({
      user: req.user._id,
      complete: true,
    }).sort({ completedAt: -1 });

    const incompleteToDos = await ToDo.find({
      user: req.user._id,
      complete: false,
    }).sort({ createdAt: -1 });

    return res.json({ incomplete: incompleteToDos, complete: completeToDos });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

// @route  PUT api/todos/:toDoId/complete
// @desc   Mark a todo as complete
// @access Private
router.put("/:toDoId/complete", requiresAuth, async (req, res) => {
  try {
    const toDo = await ToDo.findOne({
      _id: req.params.toDoId,
      user: req.user._id,
    });

    if (!toDo) {
      return res.status(404).json({
        msg: "ToDo not found",
      });
    }

    if (toDo.complete) {
      return res.status(400).json({
        error: "ToDo already completed",
      });
    }

    const updatedToDo = await ToDo.findOneAndUpdate(
      {
        _id: req.params.toDoId,
        user: req.user._id,
      },
      {
        complete: true,
        completedAt: new Date(),
      },
      {
        new: true,
      }
    );

    return res.json(updatedToDo);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

// @route  PUT api/todos/:toDoId/incomplete
// @desc   Mark a todo as incomplete
// @access Private
router.put("/:toDoId/incomplete", requiresAuth, async (req, res) => {
  try {
    const toDo = await ToDo.findOne({
      _id: req.params.toDoId,
      user: req.user._id,
    });

    if (!toDo) {
      return res.status(404).json({
        msg: "ToDo not found",
      });
    }

    if (!toDo.complete) {
      return res.status(400).json({
        error: "ToDo already incomplete",
      });
    }

    const updatedToDo = await ToDo.findOneAndUpdate(
      {
        _id: req.params.toDoId,
        user: req.user._id,
      },
      {
        complete: false,
        completedAt: null,
      },
      {
        new: true,
      }
    );

    return res.json(updatedToDo);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

// @route  PUT api/todos/:toDoId
// @desc   Update a todo
// @access Private
router.put("/:toDoId", requiresAuth, async (req, res) => {
  try {
    const toDo = await ToDo.findOne({
      _id: req.params.toDoId,
      user: req.user._id,
    });

    if (!toDo) {
      return res.status(404).json({
        msg: "ToDo not found",
      });
    }

    const { errors, isValid } = validateToDoInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const updatedToDo = await ToDo.findOneAndUpdate(
      {
        _id: req.params.toDoId,
        user: req.user._id,
      },
      {
        content: req.body.content,
      },
      {
        new: true,
      }
    );

    return res.json(updatedToDo);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

// @route  Delete api/todos/:toDoId
// @desc   Delete a todo
// @access Private
router.delete("/:toDoId", requiresAuth, async (req, res) => {
  try {
    const toDo = await ToDo.findOne({
      _id: req.params.toDoId,
      user: req.user._id,
    });

    if (!toDo) {
      return res.status(404).json({
        msg: "ToDo not found",
      });
    }

    await ToDo.findOneAndRemove({
      _id: req.params.toDoId,
      user: req.user._id,
    });

    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

module.exports = router;
