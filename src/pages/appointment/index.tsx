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
    { id: "customerName", label: "Khách hàng ", minWidth: 150 },
    {
      id: "staffName",
      label: "Nhân viên",
      minWidth: 150,
    },
    { id: "date", label: "Ngày", minWidth: 100 },
    { id: "time", label: "Thời gian", minWidth: 100 },
    { id: "email", label: "Email", minWidth: 100 },
    {
      id: "phoneNumber",
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
      setAppointments(response.items);
    } catch (error) {
      console.error("Failed to fetch vouchers");
    }
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    setLoading(true);

    fetchAppointments();
    setLoading(false);
  }, [currentPage]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const onViewDetails = (id: string) => {
    navigate(`${id}`);
  };
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Danh Sách Buổi hẹn
        </Typography>

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
