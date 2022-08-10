import React from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import ToDoCard from "./ToDoCard";

const Dashboard = () => {
  const { user, completeToDos, incompleteToDos } = useGlobalContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user && navigate) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div className="dashboard">
      <div className="todos">
        {incompleteToDos.map((toDo) => (
          <ToDoCard toDo={toDo} key={toDo._id} />
        ))}
      </div>

      {completeToDos.length > 0 && (
        <div className="todos">
          <h2 className="todos__title">Complete ToDo's</h2>
          {completeToDos.map((toDo) => (
            <ToDoCard toDo={toDo} key={toDo._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
