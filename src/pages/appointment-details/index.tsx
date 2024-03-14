import { Box, Button, TextField } from "@mui/material";
import {
  ObjectDetailsDisplay,
  SidebarMenu,
  CustomTable,
  Pagination,
  Loading,
} from "../../components";
import { AppointmentService, AccountService } from "../../service";
import { Appointment, Account } from "../../interface";
import { useParams } from "react-router";
import { useState, useEffect } from "react";

interface Field<T> {
  id: keyof T;
  label: string;
  type: "string" | "number" | "image";
}
const initialAppointment: Appointment = {
  id: "",
  nameCustomer: "",
  nameStaff: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  description: "",
};

const AppointmentDetailsPage = () => {
  const [loadingAppointment, setLoadingAppointment] = useState<boolean>(false);
  const [loadingStaff, setLoadingStaff] = useState<boolean>(false);
  const { id } = useParams();
  const [appointment, setAppointment] =
    useState<Appointment>(initialAppointment);
  const [staff, setStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const fields: Field<Appointment>[] = [
    { id: "nameCustomer", label: "Tên Khách Hàng ", type: "string" },
    { id: "nameStaff", label: "Tên Nhân Viên", type: "string" },
    { id: "email", label: "Mail", type: "string" },
    { id: "phone", label: "Số điện thoại", type: "string" },
    { id: "date", label: "Ngày ", type: "string" },
    { id: "time", label: "Thời Gian", type: "string" },
    { id: "description", label: "Mô tả yêu cầu", type: "string" },
  ];
  const columns = [
    { id: "staffName", label: "Tên ", minWidth: 170 },
    {
      id: "staffId",
      label: "Action",
      minWidth: 170,
      format: (value: string) => (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="myForm-button"
          onClick={() => handlerPickStaff(appointment.id, value)}
        >
          Pick
        </Button>
      ),
    },
  ];
  const fetchAppointment = async () => {
    setLoadingAppointment(true);
    const response = await AppointmentService.getAppointmentById(`${id}`);
    setAppointment(response);
    setLoadingAppointment(false);
  };
  const fetchTotalPages = async () => {
    const response = await AccountService.getTotalPageStaffForAppoinment(
      appointment
    );
    setTotalPages(response);
  };
  const fetchStaffs = async () => {
    const response = await AppointmentService.getStaff(`${id}`);
    setStaff(response);
  };
  useEffect(() => {
    fetchAppointment();
    setLoadingStaff(true);
    fetchTotalPages();
    fetchStaffs();
    setLoadingStaff(false);
  }, [currentPage]);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handlerPickStaff = async (idAppointment: string, idStaff: string) => {
    setLoadingAppointment(true);
    setLoadingStaff(true);
    await AppointmentService.postPickStaffAppointment(idAppointment, idStaff);
    fetchAppointment();
    fetchTotalPages();
    fetchStaffs();
    setLoadingAppointment(false);
    setLoadingStaff(false);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {loadingAppointment ? (
          <Loading />
        ) : (
          <ObjectDetailsDisplay data={appointment} fields={fields} />
        )}

        {loadingStaff ? (
          <Loading />
        ) : (
          <>
            {" "}
            <CustomTable columns={columns} data={staff} />
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
export default AppointmentDetailsPage;
