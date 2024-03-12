import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FormField, Loading, MyForm, SidebarMenu } from "../../components";
import { Typography, Box } from "@mui/material";
import { Category, Product } from "../../interface";
import { CategoryService, ProductService } from "../../service";

const AddProductPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const [typeOptions, setTypeOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const AddProductFields: FormField[] = [
    { type: "text", label: "Name", name: "name" },
    { type: "number", label: "Price", name: "price" },
    { type: "text", label: "Description", name: "description" },
    {
      type: "select",
      label: "Category",
      name: "category",
      options: typeOptions,
    },
    { type: "image", label: "Picture", name: "picture" },
  ];

  const handleSubmit = async (values: Product) => {
    setLoading(true);
    await ProductService.createProduct(values);
    setLoading(false);
  };
  const fetchCategories = async () => {
    setLoading(true);
    const response = await CategoryService.getCategories();
    setCategories(response);
    setLoading(false);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    const newTypeOptions = categories.map((category) => ({
      label: category.name,
      value: category.id,
    }));

    setTypeOptions(newTypeOptions);
  }, [categories]);

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div className="container">
          <Typography variant="h4" gutterBottom>
            Add Product
          </Typography>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <MyForm fields={AddProductFields} onSubmit={handleSubmit} />
        )}
      </Box>
    </Box>
  );
};

export default AddProductPage;
