import React, { useState, useEffect } from "react";
import {
  CustomTable,
  SidebarMenu,
  Pagination,
  Loading,
} from "../../components";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ImportService } from "../../service";
import { Import } from "../../interface";

const statusLabels: Record<string, string> = {
  1: "Pending",
  2: "Done ",
  3: "Cancel ",
};

const columns = [
  { id: "name", label: "Tiêu đề", minWidth: 170 },
  { id: "totalPrice", label: "Giá trị", minWidth: 170 },

  {
    id: "status",
    label: "Trạng thái",
    minWidth: 100,
    format: (value: number) => statusLabels[value] || "Unknown",
  },
];
const InventoryPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const fetchImports = async () => {
    try {
      const response = await ImportService.getImportByPages(currentPage);
      setTotalPages(response.totalPagesCount);
      setImports(response.items);
    } catch (error) {
      console.error("Failed to fetch imports");
    }
  };

  const fetchTotalPages = async () => {
    try {
      const response = await ImportService.getImportTotalPages();
      setTotalPages(response);
    } catch (error) {
      console.error("Failed to fetch total pages", error);
    }
  };
  const fetchVouchersDelete = async (voucherId: string) => {
    try {
      const response = await ImportService.deleteImport(voucherId);
    } catch (error) {
      console.error("Failed to fetch delete pages", error);
    }
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [imports, setImports] = useState<Import[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    fetchImports();
    setLoading(false);
  }, [currentPage]);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (voucherId: string) => {
    navigate(`${voucherId}`);
  };

  const navigateToAddInventoryPage = () => {
    navigate("add");
  };
  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Quản Lý Nhập hàng
        </Typography>
        <div className="container-button">
          <Button
            variant="contained"
            color="primary"
            onClick={navigateToAddInventoryPage}
          >
            Thêm Đơn Nhập
          </Button>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <>
            <CustomTable columns={columns} data={imports} onEdit={handleEdit} />
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
export default InventoryPage;
