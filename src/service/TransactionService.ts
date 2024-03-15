import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API + `/Transaction`;

class TransactionService {
  static async getTransactions(
    search: string,
    FromTime: string,
    ToTime: string,
    currentPage: number
  ) {
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("accessToken")}`;
      const response = await axios.get(
        `${API_URL}/FilterTransaction?PageIndex=${currentPage}&PageSize=10&search=${search}&FromTime=${FromTime}&ToTime=${ToTime}`
      );
      if (response.data.isSuccess === true) {
        console.log(response.data.data);
        return response.data.data;
      } else toast.success(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }
  }
}

export { TransactionService as default };
