import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API + `/Authentication`;

class AuthService {
  static async login(userName: string, password: string) {
    return axios
      .post(API_URL + "/Login", {
        userName: userName,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.isSuccess && response.data.data) {
          toast.success(response.data.message);
          localStorage.setItem("user", JSON.stringify(response.data.data));
          return true;
        } else {
          toast.error(response.data.message);
        }
        return false;
      })
      .catch((error) => {
        console.error("Login error:", error);
        return false;
      });
  }

  static async logout() {
    localStorage.removeItem("user");
    toast.success("Logout");
  }

  static async getCurrentUser() {
    const user = localStorage.getItem("user");
    if (user) return JSON.parse(user);
    return null;
  }
}

export { AuthService as default };
