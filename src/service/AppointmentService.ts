import axios from "axios";
import { toast } from "react-toastify";
import { Appointment } from "../interface";

const API_URL = "api";
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
    return initialAppointments;
    try {
      const response = await axios.get(`${API_URL}/appointments`, {
        params: { page },
      });
      if (response.data.success === true) {
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
    return appointment;
    try {
      const response = await axios.get(
        `${API_URL}/appointments/${appointmentId}`
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
  static async postPickStaffAppointment(
    appointmentId: string,
    staffId: string
  ) {
    toast.success(
      `Pick staff id ${staffId} for appointment id ${appointmentId}`
    );
    return;
    try {
      const response = await axios.post(`${API_URL}/appointments/`);
      if (response.data.success !== true) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
}

export { AppointmentService as default };
