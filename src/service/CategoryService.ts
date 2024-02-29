import axios from "axios";
import { toast } from "react-toastify";
import { Category } from "../interface";

const API_URL = "api";

const initialCategory: Category[] = [
  {
    id: "5",
    name: "Giường",
  },
  {
    id: "67",
    name: "Ghế",
  },
];

const category: Category = {
  id: "5",
  name: "Giường",
};

class CategoryService {
  static async getCategories() {
    return initialCategory; // Mocked data for demonstration
    try {
      const response = await axios.get(`${API_URL}/Categorys`, {
        // params: { page },
      });
      if (response.data.success === true) {
        return response.data.data;
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }
  }
  static async getCategorysByPage(page: number, searchName: string) {
    return initialCategory; // Mocked data for demonstration
    try {
      const response = await axios.get(`${API_URL}/Categorys`, {
        params: { page },
      });
      if (response.data.success === true) {
        return response.data.data;
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }
  }

  static async getTotalPages(searchName: string) {
    return 10; // Mocked data for demonstration
    try {
      const response = await axios.get(`${API_URL}/Categorys/total-pages`);
      if (response.data.success === true) {
        return response.data.data;
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }
  }

  static async createCategory(CategoryData: Category) {
    toast.success(`Category placed for ${CategoryData.name}`);
    return; // Mocked success response
    try {
      const response = await axios.post(`${API_URL}/Categorys`, CategoryData);
      if (response.data.success !== true) {
        toast.error(response.data.message);
      } else return response.data.data;
    } catch (error) {
      toast.error("Something error");
    }
  }

  static async deleteCategory(CategoryId: string) {
    toast.success(`Category id ${CategoryId} canceled`);
    return 0; // Mocked success response
    try {
      const response = await axios.delete(`${API_URL}/Categorys/${CategoryId}`);
      if (response.data.success !== true) {
        toast.success(response.data.message);
        return response.data.data;
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error to delete");
    }
  }

  static async updateCategory(id: string, name: string) {
    toast.success(`Category id ${id} updated`);
    return; // Mocked success response
    // try {
    //   const response = await axios.put(
    //     `${API_URL}/Categorys/${CategoryData.id}`,
    //     CategoryData
    //   );
    //   if (response.data.success !== true) {
    //     toast.error(response.data.message);
    //   } else return response.data.data;
    // } catch (error) {
    //   toast.error("Something error");
    // }
  }

  static async getCategoryById(CategoryId: string) {
    return category; // Mocked data for demonstration
    try {
      const response = await axios.get(`${API_URL}/Categorys/${CategoryId}`);
      if (response.data.success !== true) {
        return response.data.data;
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something error");
    }
  }
}

export { CategoryService as default };
