import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API + "/DashBoard";

class DashBoardService {
  static async GetTotalProcessOder() {
    try {
      const response = await axios.get(`${API_URL}/GetTotalProcessOder`);
      if (response.data.isSuccess === true) {
        return response.data.data.total;
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }
  }
  static async GetTotalUsers() {
    try {
      const response = await axios.get(`${API_URL}/GetTotalUsers`);
      if (response.data.isSuccess === true) {
        return response.data.data.totalUsers;
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }
  }
  static async GetTotalFinishedOrders() {
    try {
      const response = await axios.get(`${API_URL}/GetTotalFinishedOrders`);
      if (response.data.isSuccess === true) {
        return response.data.data.totalFinishedOrders;
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }
  }
  static async GetTotalProducts() {
    try {
      const response = await axios.get(`${API_URL}/GetTotalProducts`);
      if (response.data.isSuccess === true) {
        return response.data.data[0].totalQuantity;
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }
  }
  static async Top5Product() {
    try {
      const response = await axios.get(`${API_URL}/Top5Product`);
      if (response.data.isSuccess === true) {
        return response.data.data;
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }
  }
  static async Top5User() {
    try {
      const response = await axios.get(`${API_URL}/Top5User`);
      if (response.data.isSuccess === true) {
        return response.data.data;
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }
  }
}

export { DashBoardService as default };
