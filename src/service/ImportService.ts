import axios from "axios";
import { toast } from "react-toastify";
import { Import, Item, Status } from "../interface";

const API_URL = process.env.REACT_APP_API + `/Import`;

const initialImports: Import[] = [
  {
    id: "32",
    status: 1,
    name: "Đơn hàng tháng 10",
    price: 1322,
  },
  {
    id: "322",
    status: 1,
    name: "Đơn hàng tháng 10",
    price: 1322,
  },

  {
    id: "332",
    status: 1,
    name: "Đơn hàng tháng 10",
    price: 1322,
  },
];
const importDetail: Import = {
  id: "332",
  status: 1,
  name: "Đơn hàng tháng 10",
  price: 1322,
};
const initialStatus: Status[] = [
  { id: "2", date: "14/2/2002", status: 1 },
  { id: "23", date: "23/2/2002", status: 2 },
];
const initialItem: Item[] = [
  {
    id: "2131",
    name: "Loli 1",
    price: 2313,
    quantity: 3124,
  },
];
class ImportService {
  static async getImportByPages(page: number) {
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("accessToken")}`;
      const response = await axios.get(`${API_URL}/GetImportPaging`, {
        params: {
          page: page,
          pageSize: 10,
        },
      });
      if (response.data.isSuccess === true) {
        return response.data.data;
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }
  }
  static async getImportTotalPages() {
    return 40;
  }
  static async getImportById(id: string) {
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("accessToken")}`;
      const response = await axios.get(`${API_URL}/GetImportDetail`, {
        params: {
          importID: id,
        },
      });
      if (response.data.isSuccess === true) {
        response.data.data.price = response.data.data.totalPrice;
        return response.data.data;
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }

    return importDetail;
  }
  static async deleteImport(id: string) {
    return importDetail;
  }
  static async getStatusImport(id: string) {
    return initialStatus;
  }
  static async getItemImport(id: string) {
    return initialItem;
  }
  static async changeStatus(id: string, newStatus: string) {
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("accessToken")}`;
      const response = await axios.put(`${API_URL}/UpdateStatusImport`, {
        importId: id,
        status: newStatus,
      });
      if (response.data.isSuccess === true) {
        toast.success(response.data.message);
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }
  }

  static async createImport(item: any[], title: string) {
    item.map((item) => {
      item.productId = item.idProduct;
    });
    console.log(item);
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("accessToken")}`;
      const response = await axios.post(`${API_URL}/CreateImportWithDetail`, {
        name: title,
        importDetail: item,
      });
      if (response.data.isSuccess === true) {
        toast.success(response.data.message);
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }
  }
}

export { ImportService as default };
