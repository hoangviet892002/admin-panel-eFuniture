import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API;

class OrderProcessingService {
  static async updateStatus(id: string, newStatus: number) {
    toast("id order: " + id + " new status" + newStatus);
    return;
  }
}

export { OrderProcessingService as default };
