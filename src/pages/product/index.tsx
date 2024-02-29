import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CustomTable,
  Loading,
  Pagination,
  SidebarMenu,
} from "../../components";
import { FormatNumber } from "../../helpers";
import { Category, Product } from "../../interface";
import { CategoryService, ProductService } from "../../service";
import Action from "./Action";
import "./Product.css";
const ProductPage = () => {
  const initialCategory: Category = {
    id: "none",
    name: "",
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] =
    useState<Category>(initialCategory);

  const navigate = useNavigate();
  const fetchTotalPages = async () => {
    const response = await ProductService.getTotalPages(
      currentPage,
      searchTerm
    );
    setTotalPages(response);
  };
  const fetchCategories = async () => {
    const response = await CategoryService.getCategories();
    setCategories(response);
  };
  const fetchProducts = async () => {
    const response = await ProductService.getProductsByPage(
      currentPage,
      searchTerm,
      selectedCategory.id
    );
    setProducts(response);
  };
  const fetchProductsDelete = async (Id: string) => {
    ProductService.deleteProduct(Id);
  };
  useEffect(() => {
    setLoading(true);
    fetchCategories();
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchTotalPages();
    fetchProducts();
    setLoading(false);
  }, [searchTerm, currentPage, selectedCategory]);
  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    if (event.target.value === "") {
      setSelectedCategory(initialCategory);
    } else {
      const category = categories.find((c) => c.id === event.target.value);
      setSelectedCategory(category || initialCategory);
    }
  };
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (productId: string) => {
    navigate(`${productId}`);
  };

  const handleDelete = (id: string) => {
    setLoading(true);
    fetchProductsDelete(id);
    fetchTotalPages();
    fetchProducts();
    if (products.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchTotalPages();
      fetchProducts();
    }
    setLoading(false);
  };

  const navigateToAddProductPage = () => {
    navigate("add");
  };
  const navigateToAddQuantityProductPage = () => {
    navigate("add-quantity");
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleAddQuantity = (id: string, quantity: number) => {
    setLoading(true);
    ProductService.updateQuantityProduct(id, quantity);
    fetchProducts();
    setLoading(false);
  };
  const columns = [
    { id: "name", label: "Tên Sản Phẩm", minWidth: 170 },
    {
      id: "price",
      label: "Giá",
      minWidth: 100,
      format: (value: number) => FormatNumber(value) || "Unknown",
    },
    {
      id: "quantity",
      label: "Số Lượng",
      minWidth: 100,
      format: (value: number) => FormatNumber(value) || "Unknown",
    },
    {
      id: "id",
      label: "Nhập kho",
      minWidth: 170,
      format: (value: string) => (
        <Action id={value} handler={handleAddQuantity} />
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Quản Lý Sản Phẩm
        </Typography>
        <div className="container-button">
          <Button
            variant="contained"
            color="primary"
            onClick={navigateToAddProductPage}
          >
            Thêm Sản Phẩm
          </Button>

          <TextField
            label="Tìm kiếm sản phẩm"
            variant="outlined"
            onChange={handleSearchChange}
            style={{ marginLeft: 20 }}
          />
          <Select
            labelId="category-select-label"
            id="category-select"
            value={selectedCategory ? selectedCategory.id : ""}
            label="Danh Mục"
            onChange={handleCategoryChange}
          >
            <MenuItem value="">
              <em>Không chọn</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <>
            <CustomTable
              columns={columns}
              data={products}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <Pagination
              total={totalPages}
              selected={currentPage}
              onChange={handlePageChange}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProductPage;
