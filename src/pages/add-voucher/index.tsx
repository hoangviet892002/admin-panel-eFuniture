import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FormField, MyForm, SidebarMenu } from "../../components";
import { Typography, Box } from "@mui/material";
import { VoucherService } from "../../service";
import { Voucher } from "../../interface";

const AddVoucherPage: React.FC = () => {
  const AddVoucherFields: FormField[] = [
    { type: "text", label: "Name", name: "name" },
    { type: "number", label: "Giá trị giảm(%)", name: "percent" },
    { type: "number", label: "Số lần sử dụng", name: "maxUse" },
    {
      type: "date",
      label: "Ngày bắt đầu",
      name: "startDate",
    },
    {
      type: "date",
      label: "Ngày kết thúc",
      name: "endDate",
    },
  ];

  const handleSubmit = async (values: Voucher) => {
    try {
      VoucherService.createVoucher(values);
    } catch (error) {}
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div className="container">
          <Typography variant="h4" gutterBottom>
            Add Voucher
          </Typography>
        </div>

        <MyForm fields={AddVoucherFields} onSubmit={handleSubmit} />
      </Box>
    </Box>
  );
};

export default AddVoucherPage;
