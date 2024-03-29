import axios from "axios";
import { toast } from "react-toastify";
import { Appointment } from "../interface";

const API_URL = process.env.REACT_APP_API + `/Appointment`;
const initialAppointments: Appointment[] = [
  {
    id: "1",
    nameCustomer: "Cus A",
    nameStaff: null,
    date: "20/10/2022",
    phone: "098765431",
    time: "2:00 AM",
    email: "a@gamil.com",
    description: "Muốn đóng khung cửa sổ",
  },
];

const appointment: Appointment = {
  id: "1",
  nameCustomer: "Cus A",
  nameStaff: null,
  date: "20/10/2022",
  phone: "098765431",
  time: "2:00 AM",
  email: "a@gamil.com",
  description: "Muốn đóng khung cửa sổ",
};

class AppointmentService {
  static async getAppointmentsByPage(page: number) {
    try {
      const response = await axios.get(
        `${API_URL}/GetAppointmentPaging?page=${page - 1}&pageSize=10`
      );
      if (response.data.isSuccess === true) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  static async getTotalPages(searchTerm: string, date: string) {
    return 40;
    try {
      const response = await axios.get(`${API_URL}/appointments/total-pages`);
      if (response.data.success === true) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  static async createAppointment(appointmentData: Appointment) {
    toast.success(
      `Created appointment with description: ${appointmentData.email}`
    );
    return;
    try {
      const response = await axios.post(
        `${API_URL}/appointments`,
        appointmentData
      );
      if (response.data.success !== true) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  static async deleteAppointment(appointmentId: string) {
    toast.success(`Deleted appointment with ID: ${appointmentId}`);
    return 0;
    try {
      const response = await axios.delete(
        `${API_URL}/appointments/${appointmentId}`
      );
      if (response.data.success !== true) {
        toast.success(response.data.message);
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while deleting");
    }
  }

  static async updateAppointment(appointmentData: Appointment) {
    toast.success(`Updated appointment with ID: ${appointmentData.id}`);
    return;
    try {
      const response = await axios.put(
        `${API_URL}/appointments/${appointmentData.id}`,
        appointmentData
      );
      if (response.data.success !== true) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  static async getAppointmentById(appointmentId: string) {
    try {
      const response = await axios.get(
        `${API_URL}/GetAppointmentDetail?id=${appointmentId}`
      );
      if (response.data.isSuccess === true) {
        response.data.data.nameCustomer = response.data.data.customerName;
        response.data.data.phone = response.data.data.phoneNumber;
        response.data.data.nameStaff = response.data.data.staffName;
        response.data.data.description = response.data.data.name;
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  static async getStaff(appointmentId: string) {
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("accessToken")}`;
      const response = await axios.get(
        `${API_URL}/GetStaffForAppointment?appointmentID=${appointmentId}`
      );
      console.log(response);
      if (response.data.isSuccess === true) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  static async postPickStaffAppointment(
    appointmentId: string,
    staffId: string
  ) {
    try {
      const response = await axios.post(
        `${API_URL}/PickStaffForAppointment?appointmentId=${appointmentId}&staffId=${staffId}`
      );
      if (response.data.isSuccess === true) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  static async updateStatus(appointmentId: string, newStatus: any) {
    try {
      const response = await axios.post(
        `${API_URL}/UpdateAppointmentStatus?appointmentId=${appointmentId}&newStatus=${newStatus}`
      );
      if (response.data.isSuccess === true) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
}

export { AppointmentService as default };
