import { Box } from "@mui/material";
import { SidebarMenu } from "../../components";
const HomePage = () => {
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
