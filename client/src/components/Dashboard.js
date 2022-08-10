import React from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user && navigate) {
      navigate("/");
    }
  }, [user, navigate]);
  return <div>Dashboard</div>;
};

export default Dashboard;
