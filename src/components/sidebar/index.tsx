import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VoucherIcon from "@mui/icons-material/CardGiftcard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import FeedbackIcon from "@mui/icons-material/Feedback";
import PaymentIcon from "@mui/icons-material/Payment";
import LogoutIcon from "@mui/icons-material/Logout";
import CategoryIcon from "@mui/icons-material/Category";
import ContactsIcon from "@mui/icons-material/Contacts";
import HouseIcon from "@mui/icons-material/House";
import { Link, useLocation } from "react-router-dom";
import { AuthService } from "../../service";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { text: "Voucher", icon: <VoucherIcon />, path: "/vouchers" },
  { text: "Account", icon: <AccountCircleIcon />, path: "/accounts" },
  { text: "Appointment", icon: <EventNoteIcon />, path: "/appointments" },
  { text: "Order", icon: <ShoppingBasketIcon />, path: "/orders" },
  { text: "Category", icon: <CategoryIcon />, path: "/categories" },
  {
    text: "Product",
    icon: <ProductionQuantityLimitsIcon />,
    path: "/products",
  },
  {
    text: "Inventory",
    icon: <HouseIcon />,
    path: "/inventory",
  },
  {
    text: "Contact",
    icon: <ContactsIcon />,
    path: "/contact",
  },
  { text: "Feedback", icon: <FeedbackIcon />, path: "/feedbacks" },
  { text: "Transaction", icon: <PaymentIcon />, path: "/transactions" },
];

const SidebarMenu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <Typography variant="h6" sx={{ padding: 2, textAlign: "center" }}>
        Admin Dashboard
      </Typography>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            component={Link}
            to={item.path}
            sx={{
              backgroundColor:
                location.pathname === item.path ? "#1976d2" : "inherit",
              color: location.pathname === item.path ? "#ffffff" : "inherit",
              "&:hover": {
                backgroundColor: "#1565c0",
                color: "#ffffff",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === item.path ? "inherit" : "action",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <Divider sx={{ margin: "10px 0" }} />
        <ListItem button key="logout" onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SidebarMenu;
