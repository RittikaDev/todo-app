import logo from "./logo.svg";
import "./App.css";
import { ToastContainer } from "react-toastify";

import Navbar from "./Pages/Shared/Navbar";
import Login from "./Pages/Login";
import { Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import RequireAuth from "./Pages/RequireAuth";
import AddTask from "./Pages/AddTask";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <AddTask />
            </RequireAuth>
          }
        ></Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
