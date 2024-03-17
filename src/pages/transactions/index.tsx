import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FormatNumber, FormatDate } from "../../helpers";

import { CustomTable, SidebarMenu, Pagination } from "../../components";
import { TransactionService } from "../../service";
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
  const [startDate, setStartDate] = useState<string>(FormatDate(new Date()));
  const [endDate, setEndDate] = useState<string>(FormatDate(new Date()));
  const [searchTerm, setSearchTerm] = useState("");
  const columns = [
    { id: "from", label: "From ", minWidth: 150 },
    {
      id: "to",
      label: "To",
      minWidth: 150,
    },
    {
      id: "creationDate",
      label: "Date",
      minWidth: 100,
    },
    { id: "description", label: "Comment", minWidth: 100 },
    {
      id: "amount",
      label: "Amount",
      minWidth: 100,
      format: (value: number) => FormatNumber(value) || "Unknown",
    },
  ];
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(1);
  const [type, setType] = useState("");
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleDateStartChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
  };
  const handleDateEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };
  const fetchTransaction = async () => {
    const response = await TransactionService.getTransactions(
      searchTerm,
      startDate,
      endDate,
      currentPage,
      type
    );
    setTransactions(response.items);
    setTotalPages(response.totalPagesCount);
  };
  useEffect(() => {
    fetchTransaction();
  }, [searchTerm, startDate, endDate, type]);
  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Transaction List
        </Typography>
        <TextField
          label="Search "
          variant="outlined"
          onChange={handleSearchChange}
          style={{ marginRight: 20 }}
        />
        <TextField
          label="Start Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={startDate}
          style={{ marginRight: 20 }}
          onChange={handleDateStartChange}
        />
        <TextField
          label="End Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={endDate}
          style={{ marginRight: 20 }}
          onChange={handleDateEndChange}
        />
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={handleChange}
        >
          <MenuItem value="Order">Order</MenuItem>
          <MenuItem value="OrderProcessing">OrderProcessing</MenuItem>
          <MenuItem value="System">System</MenuItem>
          <MenuItem value="3rd">3rd</MenuItem>
        </Select>
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
