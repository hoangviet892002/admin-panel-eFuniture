import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Routers from "./configs/routers";
import { AuthService } from "../service";
setInterval(async () => {
  await AuthService.reNewToken();
}, 180000);
const App = () => {
  useEffect(() => {
    AuthService.reNewToken();
  }, []);
  return (
    <div>
      <ToastContainer />
      <Routers />
    </div>
  );
};
export default App;
