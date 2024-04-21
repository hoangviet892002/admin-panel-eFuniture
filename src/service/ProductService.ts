import axios from "axios";
import { toast } from "react-toastify";
import { Product } from "../interface";

const API_URL = process.env.REACT_APP_API + `/Product`;
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Sản phẩm A",
    description: "đây là sản phẩm A",
    image: "link ảnh",
    price: 908,
    inventoryQuantity: 89739,
    categoryId: "xxx",
    categoryName: "xxx",
    status: 1,
  },
  {
    id: "434",
    name: "Sản phẩm A",
    description: "đây là sản phẩm A",
    image: "link ảnh",
    price: 908,
    inventoryQuantity: 89739,
    categoryId: "xxx",
    categoryName: "xxx",
    status: 1,
  },
];

const product: Product = {
  id: "89",
  name: "Sản phẩm A",
  description: "đây là sản phẩm A",
  image: "link ảnh",
  price: 908,
  inventoryQuantity: 89739,
  categoryId: "xxx",
  categoryName: "xxx",
  status: 1,
};

class ProductService {
  static async getProductsByPage(
    page: number,
    searchTerm: string,
    idCategory: string,
    price: any
  ) {
    try {
      const response = await axios.get(`${API_URL}/FilterProducts2`, {
        params: {
          page: page,
          categoryId: idCategory,
          productName: searchTerm,
          minPrice: price.min,
          maxPrice: price.max,
          pageSize: 10,
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
  }

  static async getTotalPages(page: number, searchTerm: string, price: any) {
    console.log(price);
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

  static async createProduct(ProductData: any) {
    console.log(ProductData.picture);
    try {
      let urls = "";
      delete axios.defaults.headers.common["Authorization"];
      for (let i = 0; i < ProductData.picture.length; i++) {
        const formData = new FormData();
        formData.append("file", ProductData.picture[i]);
        formData.append("upload_preset", "ml_default");

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
      }
      console.log(urls);
      ProductData.image = urls;
      ProductData.categoryId = ProductData.category;
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("accessToken")}`;
      try {
        const response = await axios.post(
          `${API_URL}/CreateProductByAdmin`,
          ProductData
        );
        console.log(response);
        if (response.data.isSuccess === true) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    } catch (error) {}
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
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("accessToken")}`;
      const response = await axios.put(
        `${API_URL}/UpdateProductByAdmin`,
        ProductData,
        {
          params: {
            productID: ProductData.id,
          },
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
    try {
      const response = await axios.get(`${API_URL}/GetProductByID`, {
        params: {
          id: ProductId,
        },
      });
      if (response.data.isSuccess === true) {
        console.log(response.data.data);
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  static async updateStatus(ProductId: string, newStatus: number) {
    try {
      const response = await axios.post(
        `${API_URL}/UpdateProductStatus`,
        null,
        {
          params: {
            ProductId: ProductId,
            newStatus: newStatus,
          },
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
}

export { ProductService as default };
