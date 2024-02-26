import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Routers from "./configs/routers";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routers />
    </div>
  );
};
export default App;
