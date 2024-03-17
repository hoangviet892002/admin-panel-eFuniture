import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Loading, ObjectUpdateForm, SidebarMenu } from "../../components";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Account } from "../../interface";
import { AccountService } from "../../service";
import { useParams } from "react-router";

interface Field<T> {
  id: keyof T;
  label: string;
  type: "string" | "number" | "image" | "select" | "date";
  options?: Array<{ label: string; value: string | number }>;
  name?: string;
}

const initialAccounts: Account = {
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

const UpdateAccountPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [Account, setAccount] = useState<Account>(initialAccounts);
  const { id } = useParams();
  const fields: Field<Account>[] = [
    { id: "name", label: "Nae ", type: "string" },
    { id: "dateOfBird", label: "Ngày sinh", type: "date" },
    {
      id: "gender",
      label: "Giới tính",
      type: "select",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Orther", value: "order" },
      ],
    },
    { id: "email", label: "Email", type: "string" },
    { id: "phoneNumber", label: "Số điện thoại", type: "string" },
  ];
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

  const handleSave = async (updatedAccount: any) => {
    setLoading(true);
    AccountService.updateAccount(updatedAccount);
    setLoading(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Chỉnh sửa tài khoản
        </Typography>
        {loading ? (
          <Loading />
        ) : (
          <ObjectUpdateForm
            data={Account}
            fields={fields}
            onSave={handleSave}
          />
        )}
      </Box>
    </Box>
  );
};
export default UpdateAccountPage;
