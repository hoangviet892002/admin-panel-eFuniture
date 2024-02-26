import axios from "axios";
import { toast } from "react-toastify";
import { Account, Appointment } from "../interface";

const API_URL = "api";
const initialAccounts: Account[] = [
  {
    id: "33",
    name: "Sản phẩm A",
    email: "a@gamil.com",
    password: "123456",
    address: "Anh nhà ở đâu thế",
    wallet: 200,
    role: 1,
  },
  {
    id: "2",
    name: "Sản phẩm B",
    email: "b@gamil.com",
    password: "123456",
    address: "Anh nhà ở đâu thế",
    wallet: 200,
    role: 2,
  },
  {
    id: "6",
    name: "Sản phẩm C",
    email: "c@gamil.com",
    password: "123456",
    address: "Anh nhà ở đâu thế",
    wallet: 200,
    role: 3,
  },
];

const account: Account = {
  id: "33",
  name: "Sản phẩm A",
  email: "a@gamil.com",
  password: "123456",
  address: "Anh nhà ở đâu thế",
  wallet: 200,
  role: 1,
};

class AccountService {
  static async getAccountsByPage(page: number, searchName: string) {
    return initialAccounts;
    try {
      const response = await axios.get(`${API_URL}/accounts`, {
        params: { page, searchName },
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

  static async createAccount(accountData: Account) {
    toast.success(`Created account with username: ${accountData.name}`);
    return;
    try {
      const response = await axios.post(`${API_URL}/accounts`, accountData);
      if (response.data.success !== true) {
        return response.data.data;
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

  static async updateAccount(accountData: Account) {
    toast.success(`Updated account with ID: ${accountData.id}`);
    return;
    try {
      const response = await axios.put(
        `${API_URL}/accounts/${accountData.id}`,
        accountData
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

  static async getAccountById(accountId: string) {
    return account;
    try {
      const response = await axios.get(`${API_URL}/accounts/${accountId}`);
      if (response.data.success !== true) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
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
    toast.success(`Add  id ${id} ${amount} dong`);
    return;
    try {
      const response = await axios.put(`${API_URL}/accounts/${id}/addmoney`);
      if (response.data.success !== true) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  static async subtractMoney(id: string, amount: number) {
    toast.success(`SubtractMoney  id ${id} ${amount} dong`);
    return;
    try {
      const response = await axios.put(`${API_URL}/accounts/${id}/addmoney`);
      if (response.data.success !== true) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  static async getStaffForAppoinment(appointmentData: Appointment) {
    return;
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
}

export { AccountService as default };
