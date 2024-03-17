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
    { id: "name", label: "Name ", minWidth: 170 },
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
  const [load, setLoad] = useState<boolean>(false);

  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    setLoading(true);
    fetchCategories();
    setLoading(false);
  }, [load]);
  const fetchCategories = async () => {
    try {
      const response = await CategoryService.getCategories();
      setCategories(response);
    } catch (error) {
      console.error("Failed to fetch categories");
    }
  };
  const fetchCategoryDelete = async (Id: string) => {
    await CategoryService.deleteCategory(Id);
  };
  const handleSubmit = async (values: Category) => {
    setLoading(true);
    await CategoryService.createCategory(values);
    fetchCategories();
    setLoading(false);
    setLoad(!load);
  };

  const handleEdit = async (id: string, name: string) => {
    setLoading(true);
    await CategoryService.updateCategory(id, name);
    setLoading(false);
    setLoad(!load);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    await fetchCategoryDelete(id);
    setLoading(false);
    setLoad(!load);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Categories List
        </Typography>
        {loading ? (
          <Loading />
        ) : (
          <>
            <MyForm fields={AddFields} onSubmit={handleSubmit} />
          </>
        )}

        {loading ? (
          <Loading />
        ) : (
          <>
            <CustomTable columns={columns} data={categories} />
          </>
        )}
      </Box>
    </Box>
  );
};
export default CategoryPage;
