import axios from "axios";
import { toast } from "react-toastify";
import { Account, Appointment } from "../interface";

const API_URL = process.env.REACT_APP_API + `/User`;
const API_URL_MONEY = process.env.REACT_APP_API + `/Wallet`;

const initialAccounts: Account[] = [];

const account: Account = {
  id: "",
  name: "",
  email: "",
  password: "",
  address: "",
  wallet: 0,
  roles: "",
  dateOfBird: "",
  gender: "",
  phoneNumber: "",
  lockoutEnd: "",
};

class AccountService {
  static async getAccountsByPage(
    selectRole: number,
    page: number,
    searchName: string
  ) {
    let pageSize = 10;
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("accessToken")}`;
    try {
      const response = await axios.get(`${API_URL}/GetUserByFilter`, {
        params: {
          search: searchName,
          role: selectRole,
          pageIndex: page,
          pageSize: pageSize,
        },
      });
      if (response.data.isSuccess === true) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    return initialAccounts;
  }
  static async getCustomer(page: number, searchName: string) {
    return initialAccounts;
    try {
      const response = await axios.get(`${API_URL}/accounts`, {});
      if (response.data.success === true) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  static async getTotalPagesCustomer(searchName: string) {
    return 40;
    try {
      const response = await axios.get(`${API_URL}/accounts/total-pages`, {
        params: { searchName },
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

  static async getTotalPages(searchName: string) {
    return 40;
    try {
      const response = await axios.get(`${API_URL}/accounts/total-pages`, {
        params: { searchName },
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

  static async createAccount(accountData: any) {
    console.log(accountData);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("accessToken")}`;

    try {
      const response = await axios.post(`${API_URL}/CreateUser`, accountData);
      if (response.data.isSuccess === true) {
        toast.success(response.data.message);
        return;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  static async deleteAccount(accountId: string) {
    toast.success(`Deleted account with ID: ${accountId}`);
    return 0;
    try {
      const response = await axios.delete(`${API_URL}/accounts/${accountId}`);
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

  static async updateAccount(accountData: any) {
    console.log(accountData);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("accessToken")}`;
    try {
      const response = await axios.post(`${API_URL}/UpdateUser`, accountData);
      if (response.data.isSuccess === true) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  static async getAccountById(accountId: string) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("accessToken")}`;
    try {
      const response = await axios.get(`${API_URL}/GetUserByID`, {
        params: {
          userID: accountId,
        },
      });
      if (response.data.success !== true) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    return account;
  }
  static async updateRole(id: string, newRole: number) {
    toast.success(`Update role id ${id} with new role id ${newRole}`);
    return;
    try {
      const response = await axios.put(`${API_URL}/accounts/${id}/status`);
      if (response.data.success !== true) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  static async addMoney(id: string, amount: number) {
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("accessToken")}`;
      const response = await axios.post(`${API_URL_MONEY}/AddMoneyByUserId`, {
        userId: id,
        wallet: amount,
      });
      if (response.data.isSuccess === true) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  static async subtractMoney(id: string, amount: number) {
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("accessToken")}`;
      const response = await axios.post(
        `${API_URL_MONEY}/SubtractMoneyByUserId`,
        {
          userId: id,
          wallet: amount,
        }
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
  static async getStaffForAppoinment(
    appointmentData: Appointment,
    currentPage: number
  ) {
    return initialAccounts;
    try {
      const response = await axios.put(`${API_URL}/accounts/getstaff/`);
      if (response.data.success !== true) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  static async getTotalPageStaffForAppoinment(appointmentData: Appointment) {
    return 40;
    try {
      const response = await axios.put(`${API_URL}/accounts/getstaff/`);
      if (response.data.success !== true) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  static async banUser(id: string) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("accessToken")}`;
    try {
      const response = await axios.put(`${API_URL}/BanAndUnbanUser`, null, {
        params: {
          userID: id,
        },
      });
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

export { AccountService as default };
