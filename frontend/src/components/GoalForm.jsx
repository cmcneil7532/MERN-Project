import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const GoalForm = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  const [text, setText] = useState("");
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            value={text}
            id="text"
            placeholder="Enter goal"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
};

export default GoalForm;
