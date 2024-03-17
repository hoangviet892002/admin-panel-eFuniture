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

const initalProduct = {
  categoryId: "",
  description: "",
  id: "",
  image: "",
  name: "",
  price: 0,
  inventoryQuantity: 0,
  status: 0,
  categoryName: "",
};

const UpdateProductPages = () => {
  const { id } = useParams();
  const [load, setLoad] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState(initalProduct);
  const [categories, setCategories] = useState<Category[]>([]);
  const [typeOptions, setTypeOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const fields: Field<Product>[] = [
    { id: "name", label: "Product Name", type: "string" },
    { id: "description", label: "Desciption", type: "string" },
    { id: "price", label: "Price", type: "number" },
    { id: "image", label: "Image", type: "image" },
    {
      id: "categoryId",
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
    await ProductService.updateProduct(updatedProduct);
    setLoading(false);
    setLoad(!load);
  };
  useEffect(() => {
    setLoading(true);
    fetchProduct();
    fetchCategory();
    setLoading(false);
  }, [load]);
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
          Update Product
        </Typography>
        {loading ? (
          <Loading />
        ) : (
          <ObjectUpdateForm
            data={product}
            fields={fields}
            onSave={handleSave}
          />
        )}
      </Box>
    </Box>
  );
};
export default UpdateProductPages;
