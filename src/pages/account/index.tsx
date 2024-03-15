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
import AmountAction from "./Sub-Component";
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

const AccountPage = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectRole, setSelectRole] = useState<number>(1);
  const handleRoleChange = (event: SelectChangeEvent<number>) => {
    // Directly use the string value from the event and update the selectRole state
    setSelectRole(event.target.value as number);
  };

  const columns = [
    { id: "name", label: "Tên ", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 100 },
    { id: "gender", label: "Giới tính", minWidth: 100 },
    { id: "address", label: "Địa chỉ", minWidth: 100 },
    { id: "wallet", label: "Số dư", minWidth: 100 },
    {
      id: "roles",
      label: "Role",
      minWidth: 100,
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
    {
      id: "id",
      label: "Ban",
      minWidth: 170,
      format: (value: string, rowData: Account) => {
        if (rowData.lockoutEnd === null) {
          return <Button onClick={() => handleBan(value)}>Ban</Button>;
        } else {
          return <Button onClick={() => handleBan(value)}>Un Ban</Button>;
        }
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

  const handleAdd = async (id: string, amount: number) => {
    setLoading(true);
    await AccountService.addMoney(id, amount);
    fetchAccounts();
    setLoading(false);
  };

  const handleSubtract = async (id: string, amount: number) => {
    setLoading(true);
    await AccountService.subtractMoney(id, amount);
    fetchAccounts();
    setLoading(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Danh Sách Account
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate("add");
          }}
        >
          Tạo Account
        </Button>
        <TextField
          label="Tìm kiếm khách hàng theo tên"
          variant="outlined"
          onChange={handleSearchChange}
          style={{ marginLeft: 20 }}
        />
        <Select
          labelId="role-select-label"
          id="role-select"
          value={selectRole ?? ""}
          label="Role"
          onChange={handleRoleChange}
        >
          {Object.entries(roleLabels).map(([key, label]) => (
            <MenuItem key={key} value={parseInt(key)}>
              {label}
            </MenuItem>
          ))}
        </Select>

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
