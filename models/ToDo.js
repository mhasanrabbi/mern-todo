const { Schema, model } = require("mongoose");

const ToDoSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// export model

const ToDo = model("ToDo", ToDoSchema);
module.exports = ToDo;
