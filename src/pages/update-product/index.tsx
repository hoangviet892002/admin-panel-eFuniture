import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { ObjectUpdateForm, SidebarMenu } from "../../components";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  img: string;
}
interface Field<T> {
  id: keyof T;
  label: string;
  type: "string" | "number" | "image";
}

const initialProducts: Product = {
  id: "1",
  name: "Sản phẩm A",
  price: 100000,
  quantity: 10,
  img: "",
};

const UpdateProductPages = () => {
  const [Product] = useState(initialProducts);
  const fields: Field<Product>[] = [
    { id: "name", label: "Tên Sản Phẩm", type: "string" },
    { id: "price", label: "Giá", type: "number" },
    { id: "quantity", label: "Số Lượng", type: "number" },
    { id: "img", label: "Ảnh", type: "image" },
  ];

  const handleSave = async (updatedProduct: Product) => {
    console.log("Updated Product:", updatedProduct);
    try {
      const response = await axios.post(
        "/api/update-quantity-product",
        updatedProduct
      );
      console.log("Add product response:", response.data);

      toast.success("Sửa thành công!");
    } catch (error) {
      toast.error("Sửa thất bại. Vui lòng kiểm tra lại thông tin!");
      console.error("Add error:", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Chỉnh sửa sản phẩm
        </Typography>
        <ObjectUpdateForm data={Product} fields={fields} onSave={handleSave} />
      </Box>
    </Box>
  );
};
export default UpdateProductPages;
