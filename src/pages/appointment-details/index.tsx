import { Box } from "@mui/material";
import { ObjectDetailsDisplay, SidebarMenu } from "../../components";
import { AppointmentService } from "../../service";
import { Appointment } from "../../interface";
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
  const { id } = useParams();
  const [appointment, setAppointment] =
    useState<Appointment>(initialAppointment);
  const fields: Field<Appointment>[] = [
    { id: "nameCustomer", label: "Tên Khách Hàng ", type: "string" },
    { id: "nameStaff", label: "Tên Nhân Viên", type: "string" },
    { id: "email", label: "Mail", type: "string" },
    { id: "phone", label: "Số điện thoại", type: "string" },
    { id: "date", label: "Ngày ", type: "string" },
    { id: "time", label: "Thời Gian", type: "string" },
    { id: "description", label: "Mô tả yêu cầu", type: "string" },
  ];
  const fetchAppointment = async () => {
    const response = await AppointmentService.getAppointmentById(`${id}`);
    setAppointment(response);
  };
  useEffect(() => {
    fetchAppointment();
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <ObjectDetailsDisplay data={appointment} fields={fields} />
      </Box>
    </Box>
  );
};
export default AppointmentDetailsPage;
