import React from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

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
          <h1 key={toDo._id}>{toDo.content}</h1>
        ))}
      </div>

      {completeToDos.length > 0 && (
        <div className="todos">
          <h2 className="todos__title">Complete ToDo's</h2>
          {completeToDos.map((toDo) => (
            <h1 key={toDo._id}>{toDo.content}</h1>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
