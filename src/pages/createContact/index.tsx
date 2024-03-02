import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  CustomTable,
  Loading,
  Pagination,
  SidebarMenu,
} from "../../components";

import { useNavigate } from "react-router";
import { Account } from "../../interface";
import { AccountService } from "../../service";

const AccountPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const columns = [
    { id: "name", label: "Tên ", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 100 },
    { id: "password", label: "Mật khẩu", minWidth: 100 },
    { id: "address", label: "Địa chỉ", minWidth: 100 },

    {
      id: "id",
      label: "Action",
      minWidth: 170,
      format: (value: string) => (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="myForm-button"
          onClick={() => navigate(`${value}`)}
        >
          Pick
        </Button>
      ),
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [accounts, setAccounts] = useState<Account[]>([]);

  const fetchTotalPages = async () => {
    const response = await AccountService.getTotalPagesCustomer(searchTerm);
    setTotalPages(response);
  };
  const fetchAccounts = async () => {
    try {
      const response = await AccountService.getCustomer(
        currentPage,
        searchTerm
      );
      setAccounts(response);
    } catch (error) {
      console.error("Failed to fetch vouchers");
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTotalPages();
    fetchAccounts();
    setLoading(false);
  }, [currentPage, searchTerm]);

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
          Chọn khách hàng
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
export default AccountPage;
