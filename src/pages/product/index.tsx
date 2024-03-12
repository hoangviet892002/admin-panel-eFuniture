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
import { FormatNumber, StatusGraph } from "../../helpers";
import { Category, Product } from "../../interface";
import { CategoryService, ProductService } from "../../service";

import "./Product.css";

const statusGraph = new StatusGraph();
statusGraph.addEdge(1, 2);
statusGraph.addEdge(1, 3);
statusGraph.addEdge(2, 3);
statusGraph.addEdge(2, 1);
statusGraph.addEdge(3, 1);
statusGraph.addEdge(3, 2);

const statusLabels: Record<number, string> = {
  1: "Active",
  2: "Inactive",
  3: "Processing",
};
const ProductPage = () => {
  const initialCategory: Category = {
    id: "",
    name: "",
  };
  const priceOptions = [
    { label: "All prices", min: "0", max: "1000000000" },
    { label: "100 - 200", min: "100", max: "200" },
    { label: "200 - 300", min: "200", max: "300" },
  ];

  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedPrice, setSelectedPrice] = useState(priceOptions[0]);

  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] =
    useState<Category>(initialCategory);

  const navigate = useNavigate();

  const fetchCategories = async () => {
    const response = await CategoryService.getCategories();
    setCategories(response);
  };
  const fetchProducts = async () => {
    const response = await ProductService.getProductsByPage(
      currentPage,
      searchTerm,
      selectedCategory.id,
      selectedPrice
    );
    setTotalPages(response.totalItemsCount);
    setProducts(response.items);
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
    fetchProducts();

    setLoading(false);
  }, [searchTerm, currentPage, selectedCategory, selectedPrice]);
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

  const handleStatusChange = (productId: string, newStatus: number) => {
    setLoading(true);
    ProductService.updateStatus(productId, newStatus);
    setLoading(false);
  };

  const navigateToAddProductPage = () => {
    navigate("add");
  };

  const handlePriceChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    const selectedOption = priceOptions.find(
      (option) => option.label === value
    );
    if (selectedOption) {
      setSelectedPrice(selectedOption);
    }
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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
      id: "inventoryQuantity",
      label: "Số Lượng",
      minWidth: 100,
      format: (value: number) => FormatNumber(value) || "Unknown",
    },
    {
      id: "status",
      label: "Trạng thái",
      minWidth: 100,
      format: (value: number) => statusLabels[value],
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
            labelId="price-range-select-label"
            id="price-range-select"
            value={selectedPrice.label}
            label="Price Range"
            onChange={handlePriceChange}
          >
            {priceOptions.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </Select>

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
              onStatusChange={handleStatusChange}
              statusLabels={statusLabels}
              statusGraph={statusGraph}
              onEdit={handleEdit}
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
