import axios from "axios";
import { toast } from "react-toastify";
import { Product } from "../interface";

const API_URL = "api";
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Sản phẩm A",
    description: "đây là sản phẩm A",
    img: "link ảnh",
    price: 908,
    quantity: 89739,
    category: 2,
  },
  {
    id: "434",
    name: "Sản phẩm A",
    description: "đây là sản phẩm A",
    img: "link ảnh",
    price: 908,
    quantity: 89739,
    category: 2,
  },
];

const product: Product = {
  id: "89",
  name: "Sản phẩm A",
  description: "đây là sản phẩm A",
  img: "link ảnh",
  price: 908,
  quantity: 89739,
  category: 5,
};

class ProductService {
  static async getProductsByPage(
    page: number,
    searchTerm: string,
    idCategory: string
  ) {
    return initialProducts;
    try {
      const response = await axios.get(`${API_URL}/Products`, {
        params: { page },
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

  static async getTotalPages(page: number, searchTerm: string) {
    return 40;
    try {
      const response = await axios.get(`${API_URL}/Products/total-pages`);
      if (response.data.success === true) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  static async createProduct(ProductData: Product) {
    toast.success(
      `Created Product with name: ${ProductData.name} and category: ${ProductData.category}`
    );
    return;
    try {
      const response = await axios.post(`${API_URL}/Products`, ProductData);
      if (response.data.success !== true) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  static async deleteProduct(ProductId: string) {
    toast.success(`Deleted Product with ID: ${ProductId}`);
    return 0;
    try {
      const response = await axios.delete(`${API_URL}/Products/${ProductId}`);
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

  static async updateProduct(ProductData: Product) {
    toast.success(
      `Updated Product with ID: ${ProductData.id} with new category ${ProductData.category}}`
    );
    return;
    try {
      const response = await axios.put(
        `${API_URL}/Products/${ProductData.id}`,
        ProductData
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
  static async updateQuantityProduct(ProductID: string, quantity: number) {
    toast.success(
      `Add Product with ID: ${ProductID} with new category ${quantity}`
    );
    return;
    try {
      const response = await axios.put(`${API_URL}/Products/`);
      if (response.data.success !== true) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  static async getProductById(ProductId: string) {
    return product;
    try {
      const response = await axios.get(`${API_URL}/Products/${ProductId}`);
      if (response.data.success !== true) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  static async postPickStaffProduct(ProductId: string, staffId: string) {
    toast.success(`Pick staff id ${staffId} for Product id ${ProductId}`);
    return;
    try {
      const response = await axios.post(`${API_URL}/Products/`);
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

export { ProductService as default };
