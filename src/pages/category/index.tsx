import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  CustomTable,
  Loading,
  Pagination,
  SidebarMenu,
  FormField,
  MyForm,
} from "../../components";
import { Category } from "../../interface";
import { CategoryService } from "../../service";
import Action from "./Action";
const CategoryPage = () => {
  const AddFields: FormField[] = [
    { type: "text", label: "Name", name: "name" },
  ];

  const columns = [
    { id: "name", label: "Tên ", minWidth: 170 },
    {
      id: "id",
      label: "Update",
      minWidth: 170,
      format: (value: string) => <Action id={value} handler={handleEdit} />,
    },
    {
      id: "id",
      label: "Delete",
      minWidth: 170,
      format: (value: string) => (
        <>
          <IconButton onClick={() => handleDelete(value)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const fetchTotalPages = async () => {
    const response = await CategoryService.getTotalPages(searchTerm);
    setTotalPages(response);
  };
  const fetchCategories = async () => {
    try {
      const response = await CategoryService.getCategorysByPage(
        currentPage,
        searchTerm
      );
      setCategories(response);
    } catch (error) {
      console.error("Failed to fetch categories");
    }
  };
  const fetchCategoryDelete = async (Id: string) => {
    const response = await CategoryService.deleteCategory(Id);
  };
  const handleSubmit = async (values: Category) => {
    setLoading(true);

    CategoryService.createCategory(values);
    fetchTotalPages();
    fetchCategories();
    setLoading(false);
  };
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleEdit = (id: string, name: string) => {
    setLoading(true);
    CategoryService.updateCategory(id, name);
    fetchCategories();
    setLoading(false);
  };

  const handleDelete = (id: string) => {
    setLoading(true);
    fetchCategoryDelete(id);
    fetchTotalPages();
    fetchCategories();
    if (categories.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchTotalPages();
      fetchCategories();
    }
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    fetchTotalPages();
    fetchCategories();
    setLoading(false);
  }, [currentPage, searchTerm]);
  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Danh Sách Categories
        </Typography>
        {loading ? (
          <Loading />
        ) : (
          <>
            <MyForm fields={AddFields} onSubmit={handleSubmit} />
          </>
        )}
        <TextField
          label="Tìm kiếm category"
          variant="outlined"
          onChange={handleSearchChange}
          style={{ marginLeft: 20 }}
        />
        {loading ? (
          <Loading />
        ) : (
          <>
            <CustomTable columns={columns} data={categories} />
            <Pagination
              total={totalPages}
              selected={currentPage}
              onChange={handlePageChange}
            />
          </>
        )}
      </Box>
    </Box>
  );
};
export default CategoryPage;
