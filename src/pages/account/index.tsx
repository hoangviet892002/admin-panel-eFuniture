import { Box, Typography, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { CustomTable, SidebarMenu, Pagination } from "../../components";
import { StatusGraph } from "../../helpers";
import AmountAction from "./Sub-Component";
import { useNavigate } from "react-router";
import { Account } from "../../interface";
import { AccountService } from "../../service";
import { toast } from "react-toastify";

const statusGraph = new StatusGraph();
statusGraph.addEdge(1, 2);
statusGraph.addEdge(2, 1);

const roleLabels: Record<number, string> = {
  1: "Customer",
  2: "Staff",
  3: "Admin",
};

const AccountPage = () => {
  const navigate = useNavigate();

  const columns = [
    { id: "name", label: "Tên ", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 100 },
    { id: "password", label: "Mật khẩu", minWidth: 100 },
    { id: "address", label: "Địa chỉ", minWidth: 100 },
    { id: "wallet", label: "Số dư", minWidth: 100 },
    {
      id: "role",
      label: "Role",
      minWidth: 100,
      format: (value: number) => roleLabels[value] || "Unknown",
    },
    {
      id: "id",
      label: "Thao tác tiền",
      minWidth: 170,
      format: (value: string) => (
        <AmountAction
          id={value}
          onAdd={handleAdd}
          onSubtract={handleSubtract}
        />
      ),
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [accounts, setAccounts] = useState<Account[]>([]);

  const fetchTotalPages = async () => {
    try {
      const response = await AccountService.getTotalPages(searchTerm);
      setTotalPages(response);
    } catch (error) {
      console.error("Failed to fetch total pages", error);
    }
  };
  const fetchAccounts = async () => {
    try {
      const response = await AccountService.getAccountsByPage(
        currentPage,
        searchTerm
      );
      setAccounts(response);
    } catch (error) {
      console.error("Failed to fetch vouchers");
    }
  };
  const fetchAccountsDelete = async (Id: string) => {
    try {
      const response = await AccountService.deleteAccount(Id);
    } catch (error) {
      console.error("Failed to fetch delete pages", error);
    }
  };
  const fetchAccountsUpdateRole = async (Id: string, newRole: number) => {
    try {
      AccountService.updateRole(Id, newRole);
    } catch (error) {
      console.error("Failed to fetch delete pages", error);
    }
  };
  useEffect(() => {
    fetchTotalPages();
    fetchAccounts();
    toast("fetch success");
  }, [currentPage, searchTerm]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleRoleChange = (accountId: string, newRole: number) => {
    fetchAccountsUpdateRole(accountId, newRole);
    fetchAccounts();
  };
  const handleEdit = (id: string) => {
    console.log("Edit", id);
    navigate(`${id}`);
  };

  const handleDelete = (id: string) => {
    fetchAccountsDelete(id);
    fetchTotalPages();
    fetchAccounts();
    if (accounts.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchTotalPages();
      fetchAccounts();
    }
  };
  const handleAdd = (id: string, amount: number) => {
    AccountService.addMoney(id, amount);
    fetchAccounts();
  };

  const handleSubtract = (id: string, amount: number) => {
    AccountService.subtractMoney(id, amount);
    fetchAccounts();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Danh Sách Account
        </Typography>
        <TextField
          label="Tìm kiếm khách hàng theo tên"
          variant="outlined"
          onChange={handleSearchChange}
          style={{ marginLeft: 20 }}
        />
        <CustomTable
          columns={columns}
          data={accounts}
          onStatusChange={handleRoleChange}
          statusLabels={roleLabels}
          statusGraph={statusGraph}
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
export default AccountPage;
