import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import ShowTask from "./ShowTask";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AddTask = () => {
  const [user] = useAuthState(auth);
  const [task, setTask] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const addTask = {
      // email: event.target.email.value,
      //   email: user?.email,
      title: event.target.task.value,
      description: event.target.description.value,
      completed: "false",
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("http://localhost:5001/tasks", addTask)
          .then((res) => window.location.reload(false));
        Swal.fire("Deleted!", "One item has been deleted.", "success");
      }
    });
  };
  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <div className="card w-9/12 bg-base-100 shadow-xl px-3">
          <div className="card-body">
            <h2 className="text-center text-2xl font-bold">ADD TASK</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control w-full max-w-4xl">
                <label className="label">
                  <span className="label-text">Task Name</span>
                </label>
                <input
                  type="text"
                  name="task"
                  placeholder="Task Name"
                  className="input input-bordered w-full max-w-4xl"
                />
              </div>
              <div className="form-control w-full max-w-4xl">
                <label className="label">
                  <span className="label-text">Task Description</span>
                </label>
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  className="input input-bordered w-full max-w-4xl"
                />
              </div>
              <input
                className="btn w-full max-w-4xl mt-4"
                type="submit"
                value="Add TASK"
              />
            </form>
            <ShowTask task={task} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTask;
