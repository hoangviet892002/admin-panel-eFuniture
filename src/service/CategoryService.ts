import axios from "axios";
import { toast } from "react-toastify";
import { Category } from "../interface";

const API_URL = process.env.REACT_APP_API + `/Category`;

const initialCategory: Category[] = [];

const category: Category = {
  id: "5",
  name: "Giường",
};

class CategoryService {
  static async getCategories() {
    try {
      delete axios.defaults.headers.common["Authorization"];
      const response = await axios.get(`${API_URL}/GetCategories`, {});
      if (response.data.isSuccess === true) {
        return response.data.data;
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }
    return initialCategory;
  }

  static async createCategory(CategoryData: any) {
    delete axios.defaults.headers.common["Authorization"];
    const formData = new FormData();
    formData.append("file", CategoryData.image[CategoryData.image.length - 1]);
    formData.append("upload_preset", "ml_default");
    let urls = CategoryData.name;
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dulapxpnp/image/upload",
        formData
      );
      if (urls !== "") urls = urls + ";" + response.data.secure_url;
      else urls = response.data.secure_url;

    } catch (error) {
      toast.error("Error uploading image");
      return;
    }
    formData.append("upload_preset", "ml_default");
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("accessToken")}`;
    try {
      const response = await axios.post(`${API_URL}/CreateCategory`, {
        name: urls,
      });
      if (response.data.isSuccess !== true) {
        toast.error(response.data.message);
      } else toast.success(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }
  }

  static async deleteCategory(CategoryId: string) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("accessToken")}`;
    try {
      const response = await axios.put(`${API_URL}/SoftRemoveCategory`, null, {
        params: {
          categoryId: CategoryId,
        },
      });
      if (response.data.isSuccess === true) {
        toast.success(response.data.message);
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error to delete");
    }
  }

  static async updateCategory(id: string, name: string) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("accessToken")}`;
    try {
      const response = await axios.put(
        `${API_URL}/UpdateCategory`,
        { name: name },
        {
          params: {
            categoryId: id,
          },
        }
      );
      if (response.data.isSuccess !== true) {
        toast.error(response.data.message);
      } else toast.success(response.data.message);
    } catch (error) {
      toast.error("Something error!!!");
    }
  }
}

export { CategoryService as default };
