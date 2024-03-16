import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import {
  CustomTable,
  Loading,
  SidebarMenu,
  Pagination,
} from "../../components";
import { Account, Category, Product } from "../../interface";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  AccountService,
  CategoryService,
  ContactService,
  ProductService,
} from "../../service";
import { FormatNumber } from "../../helpers";
interface Item {
  idProduct: string;
  productName: string;
  quantity: number;
  price: number;
}
const priceOptions = [
  { label: "All prices", min: "0", max: "1000000000" },
  { label: "100 - 200", min: "100", max: "200" },
  { label: "200 - 300", min: "200", max: "300" },
];
const CreateContactFormPages = () => {
  const initialAccounts = {
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
  const initialCategory = {
    id: "",
    name: "",
  };
  const initialFormData = {
    title: "",
    description: "",
    phoneNumber: "",
    email: "",
    address: "",
    name: "",
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [Account, setAccount] = useState(initialAccounts);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedPrice] = useState(priceOptions[0]);
  const [selectedCategory, setSelectedCategory] =
    useState<Category>(initialCategory);
  const [item, setItem] = useState<Item[]>([]);
  const [formData, setFormData] = useState(initialFormData);

  const [value, setValue] = useState<number>(0);
  const [pay, setPay] = useState<number>(0);
  useEffect(() => {
    const totalValue = item.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setValue(totalValue);
  }, [item]);
  useEffect(() => {
    setPay(Math.floor(value / 2));
  }, [value]);

  const handlePickItem = (idProduct: string) => {
    const product = products.find((product: any) => product.id === idProduct);
    if (!product) return;

    setItem((prevItems) => {
      const isProductInList = prevItems.some(
        (item) => item.idProduct === idProduct
      );

      if (isProductInList) {
        return prevItems;
      }

      return [
        ...prevItems,
        {
          idProduct,
          quantity: 1,
          price: (product as any).price,
          productName: (product as any).name,
        },
      ];
    });
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const fetchCategories = async () => {
    const response = await CategoryService.getCategories();
    setCategories(response);
  };
  const fetchProducts = async () => {
    const response = await ProductService.getProductsByPage(
      currentPage,
      searchTerm,
      selectedCategory.id,
      selectedPrice
    );
    setProducts(response.items);
  };
  useEffect(() => {
    setLoading(true);
    fetchCategories();
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);

    fetchProducts();
    setLoading(false);
  }, [searchTerm, currentPage, selectedCategory]);
  const { id } = useParams();

  const fetchAccount = async () => {
    try {
      const response = await AccountService.getAccountById(`${id}`);
      setAccount(response);
    } catch (error) {
      console.error("Failed toget Account ", error);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchAccount();
    setLoading(false);
  }, []);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    if (event.target.value === "") {
      setSelectedCategory(initialCategory);
    } else {
      const category = categories.find((c: any) => c.id === event.target.value);
      setSelectedCategory(category || initialCategory);
    }
  };
  const columns = [
    { id: "id", label: "Mã sản phẩm", minWidth: 170 },
    { id: "name", label: "Tên Sản Phẩm", minWidth: 170 },
    {
      id: "id",
      label: "Action",
      minWidth: 170,
      format: (value: string) => (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="myForm-button"
          onClick={() => handlePickItem(value)}
        >
          Pick
        </Button>
      ),
    },
  ];
  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedItems = item.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item
    );
    setItem(updatedItems);
  };
  const handleRemoveItem = (index: number) => {
    const updatedItems = item.filter((_, i) => i !== index);
    setItem(updatedItems);
  };
  const fieldForm = [
    { label: "Tiêu đề", name: "title" },
    { label: "Nội dung", name: "description" },
    { label: "Số điện thoại", name: "phoneNumber" },
    { label: "Email", name: "email" },
    { label: "Địa chỉ", name: "address" },
    { label: "Tên", name: "name" },
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    ContactService.createContact(`${id}`, item, formData, value, pay);
    console.log(formData);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div>{Account.name}</div>
        <TextField
          label="Tìm kiếm sản phẩm"
          variant="outlined"
          onChange={handleSearchChange}
          style={{ marginLeft: 20 }}
        />
        <Select
          labelId="category-select-label"
          id="category-select"
          value={selectedCategory ? selectedCategory.id : ""}
          label="Danh Mục"
          onChange={handleCategoryChange}
        >
          <MenuItem value="">
            <em>Không chọn</em>
          </MenuItem>
          {categories.map((category: any) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>

        {loading ? (
          <Loading />
        ) : (
          <>
            <TextField value={Account.name} label="Khách hàng" />
            <CustomTable columns={columns} data={products} />
            <Pagination
              total={totalPages}
              selected={currentPage}
              onChange={handlePageChange}
            />
            <Box>
              {item.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    marginBottom: 2,
                  }}
                >
                  <TextField
                    label="Product name"
                    variant="outlined"
                    value={item.productName}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    label="Product price"
                    variant="outlined"
                    value={item.price}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    label="Quantity"
                    variant="outlined"
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value))
                    }
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Xóa
                  </Button>
                </Box>
              ))}
            </Box>
            {fieldForm.map((fieldConfig) => (
              <TextField
                key={fieldConfig.name}
                margin="normal"
                fullWidth
                label={fieldConfig.label}
                name={fieldConfig.name}
                onChange={handleChange}
              />
            ))}
            <TextField
              value={value}
              label="Tổng giá trị"
              fullWidth
              style={{ marginBottom: "20px" }}
            />
            <TextField value={pay} label="Trả trước" fullWidth />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Lưu
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default CreateContactFormPages;
