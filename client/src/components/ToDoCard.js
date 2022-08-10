import React from "react";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalContext";

const ToDoCard = ({ toDo }) => {
  const [content, setContent] = React.useState(toDo.content);
  const [editing, setEditing] = React.useState(false);
  const input = React.useRef(null);
  const { toDoComplete, toDoInComplete } = useGlobalContext();

  const onEdit = (e) => {
    e.preventDefault();
    setEditing(true);
    input.current.focus();
  };

  const stopEditing = (e) => {
    if (e) {
      e.preventDefault();
    }

    setEditing(false);
    setContent(toDo.content);
  };

  const markAsComplete = async (e) => {
    e.preventDefault();

    axios.put(`/api/todos/${toDo._id}/complete`).then((res) => {
      toDoComplete(res.data);
    });
  };

  const markAsIncomplete = async (e) => {
    e.preventDefault();
    axios.put(`/api/todos/${toDo._id}/incomplete`).then((res) => {
      toDoInComplete(res.data);
    });
  };

  return (
    <div className={`todo ${toDo.complete ? "todo--complete" : ""}`}>
      <input
        type="checkbox"
        checked={toDo.complete}
        onChange={!toDo.complete ? markAsComplete : markAsIncomplete}
      />

      <input
        type="text"
        ref={input}
        value={content}
        readOnly={!editing}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="todo__controls">
        {!editing ? (
          <>
            {!toDo.complete && <button onClick={onEdit}>Edit</button>}
            <button>Delete</button>
          </>
        ) : (
          <>
            <button onClick={stopEditing}>Cancel</button>
            <button>Save</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ToDoCard;
