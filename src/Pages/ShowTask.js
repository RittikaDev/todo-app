import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import auth from "../firebase.init";

const ShowTask = ({ task, setItems, items }) => {
  const [user] = useAuthState(auth);
  // const [items, setItems] = useState([]);
  const [complete, setComplete] = useState([]);
  const [set, setSet] = useState(false);
  // useEffect(() => {
  //   const getItems = async () => {
  //     // const email = user?.email;
  //     const url = "http://localhost:5001/tasks";
  //     try {
  //       const { data } = await axios.get(url);
  //       console.log(data);
  //       setItems(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getItems();
  // }, []);
  // console.log(task);
  // useEffect(() => {
  //   fetch("http://localhost:5001/tasks")
  //     .then((res) => res.json())
  //     .then((data) => setItems(data));
  // }, []);
  console.log(items);

  // Delete a task
  const itemDelete = (id) => {
    // console.log(id);
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
        fetch(`http://localhost:5001/tasks/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log("deleted", data);
            const remaining = items.filter((item) => item._id !== id);
            setItems(remaining);
          });
        Swal.fire("Deleted!", "One item has been deleted.", "success");
      }
    });
  };
  const completed = (item) => {
    toast.success(`${item.title} Task Completed `);
    // setComplete(item);
    // const completedTask = [...complete, item];
    // setComplete(completedTask);
    // console.log(items);
    // console.log(item.completed);
    // items.filter((ite) => {
    // if (ite._id === item._id) {
    item.completed = "true";
    let itemSelected = item;

    const remaining = items.filter((i) => i._id !== item._id);
    setItems([...remaining, itemSelected]);

    setComplete(true);
    // });
  };
  console.log(items);
  return (
    <div className="card w-full bg-base-100 mt-5">
      {items?.map((item) => (
        <form>
          <div className="grid grid-cols-3 gap-3">
            {item.completed === "true" ? (
              <>
                <p
                  className="mt-7"
                  style={{
                    textDecoration: "line-through",
                  }}
                >
                  {item.title}
                </p>
                <p
                  className="mt-7"
                  style={{
                    textDecoration: "line-through",
                  }}
                >
                  {item.description}
                </p>
              </>
            ) : (
              <>
                <p className="mt-7">{item.title}</p>

                <p className="mt-7">{item.description}</p>
              </>
            )}
            <div className="grid grid-cols-2 gap-1">
              <input
                className="btn w-full max-w-xs mt-2"
                value="Complete"
                onClick={() => completed(item)}
              />
              <input
                className="btn w-full max-w-xs mt-2"
                value="Delete"
                onClick={() => itemDelete(item._id)}
              />
            </div>
          </div>
        </form>
      ))}
    </div>
  );
};

export default ShowTask;
