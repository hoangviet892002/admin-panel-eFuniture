import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FormField, Loading, MyForm, SidebarMenu } from "../../components";
import { Typography, Box } from "@mui/material";
import { AccountService } from "../../service";
import { Account } from "../../interface";

const AddAccountPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const AddAccountFields: FormField[] = [
    { type: "text", label: "Username", name: "userName" },
    { type: "text", label: "Tên", name: "name" },
    {
      type: "date",
      label: "Ngày sinh",
      name: "dateOfBird",
    },
    {
      type: "select",
      label: "Giới tính",
      name: "gender",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
      ],
    },
    {
      type: "select",
      label: "Role",
      name: "role",
      options: [
        { label: "Nhân viên", value: 3 },
        { label: "Giao hàng", value: 4 },
        { label: "Khách", value: 2 },
      ],
    },
    { type: "text", label: "Email", name: "email" },

    {
      type: "text",
      label: "Số điện thoại",
      name: "phoneNumber",
    },

    { type: "password", name: "password", label: "Password" },
    {
      type: "password",
      name: "passwordConfirm",
      label: "Confirm Password",
    },
  ];

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      AccountService.createAccount(values);
    } catch (error) {}
    setLoading(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div className="container">
          <Typography variant="h4" gutterBottom>
            Add Account
          </Typography>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <MyForm fields={AddAccountFields} onSubmit={handleSubmit} />
        )}
      </Box>
    </Box>
  );
};

export default AddAccountPage;
