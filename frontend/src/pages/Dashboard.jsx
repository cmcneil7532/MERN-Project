import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import GoalForm from "../components/GoalForm";

const Dashboard = () => {
  const navigate = useNavigate();
  //creating a variable that holds either null or the users info
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    //If the no user is present go back to login page
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dahboard</p>
        <GoalForm />
      </section>
    </>
  );
};

export default Dashboard;
