import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Loading, ObjectUpdateForm, SidebarMenu } from "../../components";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Category, Product } from "../../interface";
import { CategoryService, ProductService } from "../../service";
import { useParams } from "react-router";
interface Field<T> {
  id: keyof T;
  label: string;
  type: "string" | "number" | "image" | "select";
  options?: Array<{ label: string; value: string | number }>;
}

const initalProduct: Product = {
  category: 0,
  description: "",
  id: "",
  img: "",
  name: "",
  price: 0,
  quantity: 0,
};

const UpdateProductPages = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [Product, setProduct] = useState<Product>(initalProduct);
  const [categories, setCategories] = useState<Category[]>([]);
  const [typeOptions, setTypeOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const fields: Field<Product>[] = [
    { id: "name", label: "Tên Sản Phẩm", type: "string" },
    { id: "price", label: "Giá", type: "number" },
    { id: "img", label: "Ảnh", type: "image" },
    {
      id: "category",
      type: "select",
      label: "Category",
      options: typeOptions,
    },
  ];
  const fetchProduct = async () => {
    const response = await ProductService.getProductById(`${id}`);
    setProduct(response);
  };
  const fetchCategory = async () => {
    const response = await CategoryService.getCategories();
    setCategories(response);
  };

  const handleSave = async (updatedProduct: Product) => {
    setLoading(true);
    ProductService.updateProduct(updatedProduct);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    fetchProduct();
    fetchCategory();
    setLoading(false);
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
        <Typography variant="h4" gutterBottom>
          Chỉnh sửa sản phẩm
        </Typography>
        {loading ? (
          <Loading />
        ) : (
          <ObjectUpdateForm
            data={Product}
            fields={fields}
            onSave={handleSave}
          />
        )}
      </Box>
    </Box>
  );
};
export default UpdateProductPages;
