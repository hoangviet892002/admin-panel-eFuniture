// VoucherService.ts
import axios from "axios";
import { toast } from "react-toastify";
import { Voucher } from "../interface";
const API_URL = "api";
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
class VoucherService {
  static async getVouchersByPage(page: number) {
    return initialVoucher;
    try {
      const response = await axios.get(`${API_URL}/vouchers`, {
        params: { page },
      });
      if (response.data.sucess === true) {
        return response.data.data;
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error");
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
  static async createVoucher(voucherData: Voucher) {
    toast.success(`Create voucher ${voucherData.name}`);
    return;
    try {
      const response = await axios.post(`${API_URL}/vouchers`, voucherData);
      if (response.data.sucess !== true) {
        return response.data.data;
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }
  }

  static async deleteVoucher(voucherId: string) {
    toast.success(`Delete voucher id ${voucherId}`);
    return 0;
    try {
      const response = await axios.delete(`${API_URL}/vouchers/${voucherId}`);
      if (response.data.sucess !== true) {
        toast.success(response.data.message);
        return response.data.data;
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error to delete");
    }
  }

  static async updateVoucher(voucherData: Voucher) {
    toast.success(`update success voucher id ${voucherData.id}`);
    return;
    try {
      const response = await axios.put(
        `${API_URL}/vouchers/${voucherData.id}`,
        voucherData
      );
      if (response.data.sucess !== true) {
        toast.success(response.data.message);
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }
  }

  static async getVoucherById(voucherId: string) {
    return voucher;
    try {
      const response = await axios.get(`${API_URL}/vouchers/${voucherId}`);
      if (response.data.sucess !== true) {
        return response.data.data;
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }
  }
}

export { VoucherService as default };
