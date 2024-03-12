import React, { useState, useEffect } from "react";
import {
  CustomTable,
  SidebarMenu,
  Pagination,
  Loading,
} from "../../components";
import { Box, Typography, Button, TextField } from "@mui/material";
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
  const [loading, setLoading] = useState<boolean>(false);
  const fetchVouchers = async () => {
    try {
      const response = await VoucherService.getVouchersByPage(
        currentPage,
        date
      );
      setTotalPages(response.totalPagesCount);
      setVouchers(response.items);
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
    await VoucherService.deleteVoucher(voucherId);
  };
  const [load, setLoad] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    fetchVouchers();
    setLoading(false);
  }, [currentPage, date, load]);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };
  const handleEdit = (voucherId: string) => {
    navigate(`${voucherId}`);
  };

  const handleDelete = (voucherId: string) => {
    setLoading(true);
    fetchVouchersDelete(voucherId);
    setLoading(false);
    setLoad(!load);
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
          <TextField
            label="ngày"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginRight: 20 }}
            onChange={handleDateChange}
          />
        </div>
        {loading ? (
          <Loading />
        ) : (
          <>
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
          </>
        )}
      </Box>
    </Box>
  );
};
export default VoucherPage;
