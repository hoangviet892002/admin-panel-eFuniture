import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  CustomTable,
  SidebarMenu,
  Pagination,
  Loading,
} from "../../components";
import { StatusGraph } from "../../helpers";

import { useNavigate } from "react-router";
import { Account } from "../../interface";
import { AccountService } from "../../service";
import { toast } from "react-toastify";

const roleLabels: Record<number, string> = {
  1: "Admin",
  2: "Customer ",
  3: "Staff ",
  4: "DeliveryStaff",
};

const PickCustomerPage = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectRole] = useState(2);

  const columns = [
    { id: "name", label: "Name ", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 100 },
    { id: "gender", label: "Gender", minWidth: 100 },
    { id: "address", label: "Address", minWidth: 100 },
    {
      id: "id",
      label: "Pick",
      minWidth: 170,
      format: (value: string) => {
        return <Button onClick={() => navigate(`${value}`)}>Pick</Button>;
      },
    },
  ];
  const handleBan = async (idAccount: string) => {
    setLoad(true);
    await AccountService.banUser(idAccount);
    setCurrentPage(currentPage);
    setLoad(false);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [accounts, setAccounts] = useState<Account[]>([]);

  const fetchAccounts = async () => {
    try {
      const response = await AccountService.getAccountsByPage(
        selectRole,
        currentPage,
        searchTerm
      );
      setAccounts(response.items);
      setTotalPages(response.totalPagesCount);
    } catch (error) {
      console.error("Failed to fetch vouchers");
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchAccounts();
    setLoading(false);
  }, [currentPage, searchTerm, selectRole, load]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Account List
        </Typography>

        <TextField
          label="Tìm kiếm khách hàng theo tên"
          variant="outlined"
          onChange={handleSearchChange}
          style={{ marginLeft: 20 }}
        />

        {loading ? (
          <Loading />
        ) : (
          <>
            <CustomTable columns={columns} data={accounts} />
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
export default PickCustomerPage;
