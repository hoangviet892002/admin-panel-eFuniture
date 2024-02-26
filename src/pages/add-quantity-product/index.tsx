import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Box, Typography } from "@mui/material";
import { FormField, MyForm, SidebarMenu } from "../../components";

const AddQuantityProductPage: React.FC = () => {
  const typeLabels: Record<number, string> = {
    1: "Sofa luxury",
    3: "Begs Bình dân",
  };
  const typeOptions = Object.entries(typeLabels).map(([value, label]) => ({
    label,
    value,
  }));

  const AddProductFields: FormField[] = [
    {
      type: "select",
      label: "Sản phẩm",
      name: "id",
      options: typeOptions,
    },
    { type: "number", label: "Số lượng", name: "quantity" },
  ];

  const handleSubmit = async (values: any) => {
    console.log(values);
    try {
      const response = await axios.post("/api/add-quantity-product", values);
      console.log("Add product response:", response.data);

      toast.success("Thêm thành công!");
    } catch (error) {
      toast.error("Thêm thất bại. Vui lòng kiểm tra lại thông tin!");
      console.error("Add error:", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div className="container">
          <Typography variant="h4" gutterBottom>
            Nhập kho
          </Typography>
        </div>

        <MyForm fields={AddProductFields} onSubmit={handleSubmit} />
      </Box>
    </Box>
  );
};

export default AddQuantityProductPage;
