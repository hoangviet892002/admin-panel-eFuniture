import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
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
import { StatusGraph } from "../../helpers";

interface Field<T> {
  id: keyof T;
  label: string;
  type: "string" | "number" | "image";
}
const initialAppointment = {
  id: "",
  nameCustomer: "",
  nameStaff: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  description: "",
  status: 0,
};
const statusGraph = new StatusGraph();

statusGraph.addEdge(2, 3);

const statusLabels: Record<number, string> = {
  1: "Pending",
  2: "Waiting",
  3: "Done",
  4: "Cancel",
};
const AppointmentDetailsPage = () => {
  const [loadingAppointment, setLoadingAppointment] = useState<boolean>(false);
  const [loadingStaff, setLoadingStaff] = useState<boolean>(false);
  const { id } = useParams();
  const [appointment, setAppointment] = useState(initialAppointment);
  const [staff, setStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const fields: Field<Appointment>[] = [
    { id: "nameCustomer", label: "Customer Name ", type: "string" },
    { id: "nameStaff", label: "Staff Name", type: "string" },
    { id: "email", label: "Mail", type: "string" },
    { id: "phone", label: "Phone Number", type: "string" },
    { id: "date", label: "Date ", type: "string" },
    { id: "time", label: "Time", type: "string" },
    { id: "description", label: "Description", type: "string" },
  ];
  const columns = [
    { id: "staffName", label: "Staff Name ", minWidth: 170 },
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
  const handleChange = async (event: SelectChangeEvent<number>) => {
    setLoadingAppointment(true);
    setLoadingStaff(true);
    const selectedStatus = event.target.value;

    await AppointmentService.updateStatus(`${id}`, selectedStatus);
    fetchAppointment();
    fetchTotalPages();
    fetchStaffs();
    setLoadingAppointment(false);
    setLoadingStaff(false);
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
            <TextField value={statusLabels[appointment.status]} />
            <Select value={appointment.status} onChange={handleChange}>
              {statusGraph
                .getNextStates(appointment.status)
                .map((nextState) => (
                  <MenuItem value={nextState}>
                    {statusLabels ? statusLabels[nextState] : nextState}
                  </MenuItem>
                ))}
            </Select>
          </>
        )}
      </Box>
    </Box>
  );
};
export default AppointmentDetailsPage;
