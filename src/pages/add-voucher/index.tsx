import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FormField, Loading, MyForm, SidebarMenu } from "../../components";
import { Typography, Box } from "@mui/material";
import { VoucherService } from "../../service";
import { Voucher } from "../../interface";

const AddVoucherPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
    try {
      VoucherService.createVoucher(values);
    } catch (error) {}
    setLoading(false);
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
        {loading ? (
          <Loading />
        ) : (
          <MyForm fields={AddVoucherFields} onSubmit={handleSubmit} />
        )}
      </Box>
    </Box>
  );
};

export default AddVoucherPage;
