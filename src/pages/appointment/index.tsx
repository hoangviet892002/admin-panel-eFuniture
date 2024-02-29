import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Typography, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  CustomTable,
  SidebarMenu,
  Pagination,
  Loading,
} from "../../components";
import { AppointmentService } from "../../service";
import { Appointment } from "../../interface";
import { toast } from "react-toastify";

const AppointmentPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const columns = [
    { id: "nameCustomer", label: "Khách hàng ", minWidth: 150 },
    {
      id: "nameStaff",
      label: "Nhân viên",
      minWidth: 150,
    },
    { id: "date", label: "Ngày", minWidth: 100 },
    { id: "time", label: "Thời gian", minWidth: 100 },
    { id: "email", label: "Email", minWidth: 100 },
    {
      id: "phone",
      label: "Số điện thoại",
      minWidth: 100,
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
  const fetchAppointments = async () => {
    try {
      const response = await AppointmentService.getAppointmentsByPage(
        currentPage
      );
      setAppointments(response);
    } catch (error) {
      console.error("Failed to fetch vouchers");
    }
  };

  const fetchTotalPages = async () => {
    try {
      const response = await AppointmentService.getTotalPages(searchTerm, date);
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
    fetchAppointments();
    setLoading(false);
  }, [currentPage, searchTerm, date]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
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
          Danh Sách Buổi hẹn
        </Typography>
        <TextField
          label="ngày"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginRight: 20 }}
          onChange={handleDateChange}
        />
        <TextField
          label="Tìm kiếm theo tên khách hàng"
          variant="outlined"
          onChange={handleSearchChange}
        />
        {loading ? (
          <Loading />
        ) : (
          <>
            <CustomTable columns={columns} data={appointments} />
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
export default AppointmentPage;
