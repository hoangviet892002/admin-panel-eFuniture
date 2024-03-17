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
    { type: "number", label: "Discount(%)", name: "percent" },
    { type: "number", label: "Quantity", name: "number" },
    {
      type: "date",
      label: "Start Date",
      name: "startDate",
    },
    {
      type: "date",
      label: "End Date",
      name: "endDate",
    },
    {
      type: "number",
      label: "Minimum Order Value",
      name: "minimumOrderValue",
    },
    {
      type: "number",
      label: "Maximum Discount Value",
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
