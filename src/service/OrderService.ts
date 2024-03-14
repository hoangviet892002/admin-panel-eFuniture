// OrderService.ts
import axios from "axios";
import { toast } from "react-toastify";
import { Item, Order, Status } from "../interface"; // Assuming you have an Order interface defined similarly to Voucher

const API_URL = process.env.REACT_APP_API + `/Order`;

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
const initialItem: Item[] = [
  {
    id: "2131",
    name: "Loli 1",
    price: 2313,
    quantity: 3124,
  },
];
const initialStatus: Status[] = [
  { id: "2", date: "14/2/2002", status: 1 },
  { id: "23", date: "23/2/2002", status: 2 },
  { id: "222", date: "24/2/2002", status: 3 },
];
class OrderService {
  static async getOrdersByPage(page: number, searchName: string) {
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("accessToken")}`;
      const response = await axios.get(
        `${API_URL}/GetOrderByFilter?PageSize=10&PageIndex=${page}&Search=${searchName}`
      );
      if (response.data.isSuccess === true) {
        const result = response.data.data;
        result.items.map((item: any) => {
          item.status = item.statusOrder.statusCode;
        });
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
  static async getOrderStatus(orderId: string) {
    return initialStatus;
  }
  static async getOrderItem(orderId: string) {
    return initialItem;
  }
}

export { OrderService as default };
