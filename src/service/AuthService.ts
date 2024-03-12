import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API + `/Authentication`;

class AuthService {
  static async login(userName: string, password: string) {
    const data = {
      userName: userName,
      password: password,
    };
    return axios
      .post(API_URL + "/Login", data)
      .then((response) => {
        if (response.data.isSuccess && response.data.data) {
          const parts = response.data.data.accessToken.split(".");

          if (parts.length !== 3) {
            throw new Error("JWT token must have 3 parts");
          }

          // The payload is the second part of the token
          const payload = parts[1];

          // Base64 decode the payload
          const decodedPayload = atob(payload);
          const role =
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
          // Parse the decoded payload to get a JSON object
          try {
            const parsedPayload = JSON.parse(decodedPayload);
            if (parsedPayload[role] !== "Administrator") {
              toast.error("Mày không thuộc về nơi này");
              return;
            }
          } catch (e) {
            toast.error("Lỗi gì đó");
            return;
          }
          localStorage.setItem("accessToken", response.data.data.accessToken);
          localStorage.setItem("refreshToken", response.data.data.refreshToken);
          localStorage.setItem("user", "true");
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.data.accessToken}`;
          toast.success(response.data.message);
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
    axios.defaults.headers.common["Authorization"] = "";
    toast.success("Logout");
  }

  static async getCurrentUser() {
    const user = localStorage.getItem("user");
    if (user) return JSON.parse(user);
    return null;
  }
  static async reNewToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(API_URL + "/RenewToken", {
        refreshToken: refreshToken,
        accessToken: accessToken,
      });

      if (response.data.isSuccess === true && response.data.data) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        localStorage.setItem("user", "true");

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.data.accessToken}`;
      }
      return;
    } catch (error) {
      console.error("Error renewing token:", error);
    }
    localStorage.removeItem("user");
    return;
  }
}

export { AuthService as default };
