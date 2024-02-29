import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Loading, ObjectUpdateForm, SidebarMenu } from "../../components";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { VoucherService } from "../../service";
import { useParams } from "react-router";
interface Voucher {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  percent: number;
  maxUse: number;
}
interface Field<T> {
  id: keyof T;
  label: string;
  type: "string" | "number" | "image";
}

const initialVouchers: Voucher = {
  id: "",
  name: "",
  startDate: "",
  endDate: "",
  percent: 0,
  maxUse: 0,
};

const UpdateVoucherPages = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [Voucher, setVoucher] = useState<Voucher>(initialVouchers);
  const { id } = useParams();
  const fields: Field<Voucher>[] = [
    { id: "name", label: "Tên Voucher", type: "string" },
    { id: "startDate", label: "Ngày bắt đầu", type: "string" },
    { id: "endDate", label: "Ngày kết thúc", type: "string" },
    { id: "maxUse", label: "Số lần sử dụng", type: "string" },
    { id: "percent", label: "Giá trị sử dụng (%)", type: "string" },
  ];
  const fetchVoucher = async () => {
    setLoading(true);

    const response = await VoucherService.getVoucherById(`${id}`);
    setVoucher(response);
    setLoading(false);
  };
  useEffect(() => {
    fetchVoucher();
  }, []);

  const handleSave = async (updatedVoucher: Voucher) => {
    setLoading(true);
    VoucherService.updateVoucher(updatedVoucher);
    setLoading(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Chỉnh sửa sản phẩm
        </Typography>
        {loading ? (
          <Loading />
        ) : (
          <ObjectUpdateForm
            data={Voucher}
            fields={fields}
            onSave={() => handleSave(Voucher)}
          />
        )}
      </Box>
    </Box>
  );
};
export default UpdateVoucherPages;
