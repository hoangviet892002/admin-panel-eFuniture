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
    { type: "text", label: "Name", name: "voucherName" },
    { type: "number", label: "Giá trị giảm(%)", name: "percent" },
    { type: "number", label: "Số lần sử dụng", name: "number" },
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
    {
      type: "number",
      label: "Dành cho đơn hàng nhỏ nhất là",
      name: "minimumOrderValue",
    },
    {
      type: "number",
      label: "Dành cho đơn hàng lớn nhất là",
      name: "maximumDiscountAmount",
    },
  ];

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await VoucherService.createVoucher(values);
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
