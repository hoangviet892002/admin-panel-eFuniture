import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { FormatNumber } from "../../helpers";

import { CustomTable, SidebarMenu, Pagination } from "../../components";
interface Transaction {
  id: string;
  source: string;
  accountNumber: string;
  amount: number;
  date: string;
  content: string;
}
const initialTransactions: Transaction[] = [
  {
    id: "1",
    source: "momo",
    accountNumber: "8907308218301238",
    date: "20/10/2022 17:00:00",
    content: "Hôm qua em tuyệt lắm",
    amount: 98290381,
  },
];
const TransactiontionsPage = () => {
  const columns = [
    { id: "source", label: "Nguồn ", minWidth: 150 },
    {
      id: "accountNumber",
      label: "Số tài khoản",
      minWidth: 150,
    },
    { id: "date", label: "Ngày", minWidth: 100 },
    { id: "content", label: "Nội dung chuyển khoản", minWidth: 100 },
    {
      id: "amount",
      label: "Số tiền",
      minWidth: 100,
      format: (value: number) => FormatNumber(value) || "Unknown",
    },
  ];
  const [transactions] = useState(initialTransactions);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages: number = 40;
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Danh Sách Hóa Đơn Nạp Tiền
        </Typography>
        <CustomTable columns={columns} data={transactions} />
        <Pagination
          total={totalPages}
          selected={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};
export default TransactiontionsPage;
