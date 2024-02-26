import React, { useState, useEffect } from "react";
import { CustomTable, SidebarMenu, Pagination } from "../../components";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VoucherService } from "../../service";

interface Voucher {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  percent: number;
  maxUse: number;
}

const columns = [
  { id: "name", label: "Tên Voucher", minWidth: 170 },
  { id: "startDate", label: "Ngày bắt đầu", minWidth: 100 },
  { id: "endDate", label: "Ngày kết thúc", minWidth: 100 },
  { id: "percent", label: "Giá trị(%)", minWidth: 100 },
  { id: "maxUse", label: "Số lần sử dụng", minWidth: 100 },
];
const VoucherPage = () => {
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [totalPages, setTotalPages] = useState<number>(0);
  // const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const fetchVouchers = async () => {
    try {
      const response = await VoucherService.getVouchersByPage(currentPage);
      setVouchers(response);
    } catch (error) {
      console.error("Failed to fetch vouchers");
    }
  };

  const fetchTotalPages = async () => {
    try {
      const response = await VoucherService.getTotalPages();
      setTotalPages(response);
    } catch (error) {
      console.error("Failed to fetch total pages", error);
    }
  };
  const fetchVouchersDelete = async (voucherId: string) => {
    try {
      const response = await VoucherService.deleteVoucher(voucherId);
    } catch (error) {
      console.error("Failed to fetch delete pages", error);
    }
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchTotalPages();
    fetchVouchers();
    toast("fetch success");
  }, [currentPage]);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (voucherId: string) => {
    navigate(`${voucherId}`);
  };

  const handleDelete = (voucherId: string) => {
    fetchVouchersDelete(voucherId);
    fetchTotalPages();
    fetchVouchers();
    if (vouchers.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchTotalPages();
      fetchVouchers();
    }
  };

  const navigateToAddVoucherPage = () => {
    navigate("add");
  };
  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Quản Lý Voucher
        </Typography>
        <div className="container-button">
          <Button
            variant="contained"
            color="primary"
            onClick={navigateToAddVoucherPage}
          >
            Thêm Voucher
          </Button>
        </div>

        <CustomTable
          columns={columns}
          data={vouchers}
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
export default VoucherPage;
