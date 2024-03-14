// VoucherService.ts
import axios from "axios";
import { toast } from "react-toastify";
import { Voucher } from "../interface";
const API_URL = process.env.REACT_APP_API + `/Voucher`;
const initialVoucher: Voucher[] = [
  {
    id: "1",
    name: "Voucher A",
    startDate: "2/10/2024",
    endDate: "2/10/2024",
    percent: 20,
    maxUse: 2,
  },
];
const voucher: Voucher = {
  id: "1",
  name: "Voucher A",
  startDate: "2/10/2024",
  endDate: "2/10/2024",
  percent: 20,
  maxUse: 2,
};
const convertToYYYYMMDD = (inputDate: string) => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Thêm '0' nếu cần
  const day = date.getDate().toString().padStart(2, "0"); // Thêm '0' nếu cần
  return `${year}-${month}-${day}`;
};
class VoucherService {
  static async getVouchersByPage(page: number, date: string) {
    console.log(page);
    console.log(date);
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("accessToken")}`;
      const response = await axios.get(`${API_URL}/Fileter`, {
        params: { pageIndex: page - 1, pageSize: 10, date: date },
      });
      if (response.data.isSuccess === true) {
        response.data.data.items.map((item: any) => {
          item.name = item.voucherName;
          item.maxUse = item.number;
        });
        return response.data.data;
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  static async getTotalPages() {
    return 40;
    try {
      const response = await axios.get(`${API_URL}/vouchers/total-pages`);
      if (response.data.sucess === true) {
        return response.data.data;
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }
  }
  static async createVoucher(voucherData: any) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("accessToken")}`;
    try {
      const response = await axios.post(
        `${API_URL}/CreateVoucher`,
        voucherData
      );
      if (response.data.isSuccess === true) {
        toast.success(response.data.message);
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }
  }

  static async deleteVoucher(voucherId: string) {
    try {
      const response = await axios.delete(`${API_URL}/DeleteVoucher`, {
        params: { id: voucherId },
      });
      if (response.data.isSuccess === true) {
        toast.success(response.data.message);
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error to delete");
    }
  }

  static async updateVoucher(voucherData: any) {
    console.log(voucherData);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("accessToken")}`;
    try {
      const response = await axios.post(
        `${API_URL}/UpdateVoucher`,
        voucherData,
        { params: { id: voucherData.id } }
      );
      if (response.data.isSuccess === true) {
        toast.success("Update success");
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }
  }

  static async getVoucherById(voucherId: string) {
    try {
      const response = await axios.get(`${API_URL}/SearchVoucherById`, {
        params: {
          id: voucherId,
        },
      });
      if (response.data.isSuccess === true) {
        console.table(response);
        response.data.data.endDate = convertToYYYYMMDD(
          response.data.data.endDate
        );
        response.data.data.startDate = convertToYYYYMMDD(
          response.data.data.startDate
        );
        return response.data.data;
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }
  }
}

export { VoucherService as default };
