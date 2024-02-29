// OrderService.ts
import axios from "axios";
import { toast } from "react-toastify";
import { Order } from "../interface"; // Assuming you have an Order interface defined similarly to Voucher

const API_URL = "api";

const initialOrder: Order[] = [
  {
    id: "5",
    customerName: "John Doe",
    address: "Quận Cam",
    status: 1,
    amount: 100,
    pay: 20,
  },
];

const order: Order = {
  id: "5",
  customerName: "John Doe",
  address: "Quận Cam",
  status: 1,
  amount: 100,
  pay: 20,
};

class OrderService {
  static async getOrdersByPage(page: number, searchName: string) {
    return initialOrder; // Mocked data for demonstration
    try {
      const response = await axios.get(`${API_URL}/orders`, {
        params: { page },
      });
      if (response.data.success === true) {
        return response.data.data;
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }
  }

  static async getTotalPages(searchName: string) {
    return 10; // Mocked data for demonstration
    try {
      const response = await axios.get(`${API_URL}/orders/total-pages`);
      if (response.data.success === true) {
        return response.data.data;
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }
  }

  static async createOrder(orderData: Order) {
    toast.success(`Order placed for ${orderData.customerName}`);
    return; // Mocked success response
    try {
      const response = await axios.post(`${API_URL}/orders`, orderData);
      if (response.data.success !== true) {
        toast.error(response.data.message);
      } else return response.data.data;
    } catch (error) {
      toast.error("Something error");
    }
  }

  static async deleteOrder(orderId: string) {
    toast.success(`Order id ${orderId} canceled`);
    return 0; // Mocked success response
    try {
      const response = await axios.delete(`${API_URL}/orders/${orderId}`);
      if (response.data.success !== true) {
        toast.success(response.data.message);
        return response.data.data;
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error to delete");
    }
  }

  static async updateOrder(orderData: Order) {
    toast.success(`Order id ${orderData.id} updated`);
    return; // Mocked success response
    try {
      const response = await axios.put(
        `${API_URL}/orders/${orderData.id}`,
        orderData
      );
      if (response.data.success !== true) {
        toast.error(response.data.message);
      } else return response.data.data;
    } catch (error) {
      toast.error("Something error");
    }
  }
  static async updateOrderStatus(orderId: string, newStatus: number) {
    toast.success(`Order id ${orderId} updated new status ${newStatus}`);
    return; // Mocked success response
    try {
      const response = await axios.put(`${API_URL}/orders/`, {
        orderId,
        newStatus,
      });
      if (response.data.success !== true) {
        toast.error(response.data.message);
      } else return response.data.data;
    } catch (error) {
      toast.error("Something error");
    }
  }

  static async getOrderById(orderId: string) {
    return order; // Mocked data for demonstration
    try {
      const response = await axios.get(`${API_URL}/orders/${orderId}`);
      if (response.data.success !== true) {
        return response.data.data;
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }
  }
}

export { OrderService as default };
