import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  IconButton,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  CustomTable,
  SidebarMenu,
  Pagination,
  Loading,
} from "../../components";
import { ContactService } from "../../service";
import { Contact } from "../../interface";

const ContactListPage = () => {
  const statusLabels: Record<number, string> = {
    1: "Pending",
    2: "Accepts",
    3: "Cancel",
    4: "Require Again",
  };
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const columns = [
    { id: "nameCustomer", label: "Khách hàng ", minWidth: 150 },
    {
      id: "title",
      label: "Tiêu đề",
      minWidth: 150,
    },
    { id: "value", label: "Giá trị", minWidth: 100 },
    { id: "pay", label: "Trả trước", minWidth: 100 },
    {
      id: "status",
      label: "Trạng thái",
      minWidth: 100,
      format: (value: number) => statusLabels[value],
    },
    {
      id: "id",
      label: "Action",
      minWidth: 170,
      format: (value: string) => (
        <IconButton onClick={() => onViewDetails(value)}>
          <EditIcon />
        </IconButton>
      ),
    },
  ];
  const fetchContacts = async () => {
    try {
      const response = await ContactService.getContactsByPage(
        currentPage,
        searchTerm,
        date
      );
      setContacts(response);
    } catch (error) {
      console.error("Failed to fetch vouchers");
    }
  };

  const fetchTotalPages = async () => {
    try {
      const response = await ContactService.getTotalPages(searchTerm, date);
      setTotalPages(response);
    } catch (error) {
      console.error("Failed to fetch total pages", error);
    }
  };
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    setLoading(true);
    fetchTotalPages();
    fetchContacts();
    setLoading(false);
  }, [currentPage, searchTerm, date]);
  const [Contacts, setContacts] = useState<Contact[]>([]);
  const onViewDetails = (id: string) => {
    navigate(`${id}`);
  };
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Danh Sách Hợp đồng
        </Typography>

        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <TextField
              label="ngày"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginRight: 20 }}
              onChange={handleDateChange}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Tìm kiếm theo tên khách hàng"
              variant="outlined"
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate("add");
              }}
            >
              TẠO HỢP ĐỒNG
            </Button>
          </Grid>
        </Grid>

        {loading ? (
          <Loading />
        ) : (
          <>
            <CustomTable columns={columns} data={Contacts} />
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
export default ContactListPage;
