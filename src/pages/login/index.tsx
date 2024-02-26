import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginPage.css";
import { FormField, MyForm } from "../../components";
import { Typography } from "@mui/material";
import { AuthService } from "../../service";
import { useNavigate } from "react-router";

const LoginPage: React.FC = () => {
  async function fetchUser() {
    const user = await AuthService.getCurrentUser();
    console.log(user);
    if (user !== null) {
      navigate("/");
    }
  }
  fetchUser();
  const loginFields: FormField[] = [
    { type: "text", label: "Username", name: "userName" },
    { type: "password", label: "Password", name: "password" },
  ];
  const navigate = useNavigate();
  const handleSubmit = async (values: {
    userName: string;
    password: string;
  }) => {
    const response = await AuthService.login(values.userName, values.password);
    if (response) {
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <MyForm fields={loginFields} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default LoginPage;
