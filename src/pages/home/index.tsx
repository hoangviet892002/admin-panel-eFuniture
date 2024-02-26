import React, { useEffect } from "react";
import { SidebarMenu } from "../../components";
import { Box } from "@mui/material";
import { AuthService } from "../../service";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
const HomePage = () => {
  const navigate = useNavigate();
  async function fetchUser() {
    const user = await AuthService.getCurrentUser();
    console.log(user);
    if (user === null) {
      navigate("/login");
    }
  }
  fetchUser();

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div>Home Page</div>
      </Box>
    </Box>
  );
};

export default HomePage;
