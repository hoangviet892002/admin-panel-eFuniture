import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FormField, MyForm, SidebarMenu } from "../../components";
import { Typography, Box } from "@mui/material";

const AddProductPage: React.FC = () => {
  const typeLabels: Record<number, string> = {
    1: "Sofa",
    2: "Begs",
  };
  const typeOptions = Object.entries(typeLabels).map(([value, label]) => ({
    label,
    value,
  }));

  const AddProductFields: FormField[] = [
    { type: "text", label: "Name", name: "name" },
    { type: "number", label: "Price", name: "price" },
    { type: "text", label: "Description", name: "description" },
    {
      type: "select",
      label: "Type",
      name: "type",
      options: typeOptions,
    },
    { type: "image", label: "Picture", name: "picture" },
  ];

  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.post("/api/add-product", values);
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
            Add Product
          </Typography>
        </div>

        <MyForm fields={AddProductFields} onSubmit={handleSubmit} />
      </Box>
    </Box>
  );
};

export default AddProductPage;
