import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CustomTable, SidebarMenu, Pagination } from "../../components";
import { FormatNumber } from "../../helpers";
import "./Product.css";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const initialProducts: Product[] = [
  { id: "1", name: "Sản phẩm A", price: 100000, quantity: 10 },
  { id: "2", name: "Sản phẩm B", price: 200000, quantity: 20 },
];

const ProductPage = () => {
  const [products] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages: number = 40;
  const navigate = useNavigate();

  useEffect(() => {
    //Api total page
    //Api fetch for filter
  }, [searchTerm]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (productId: string) => {
    navigate(`${productId}`);
  };

  const handleDelete = (productId: string) => {};

  const navigateToAddProductPage = () => {
    navigate("add");
  };
  const navigateToAddQuantityProductPage = () => {
    navigate("add-quantity");
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
    { id: "quantity", label: "Số Lượng", minWidth: 100 },
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
          <Button
            variant="contained"
            color="primary"
            onClick={navigateToAddQuantityProductPage}
          >
            Nhập Kho
          </Button>
          <TextField
            label="Tìm kiếm sản phẩm"
            variant="outlined"
            onChange={handleSearchChange}
            style={{ marginLeft: 20 }}
          />
        </div>

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
      </Box>
    </Box>
  );
};

export default ProductPage;
