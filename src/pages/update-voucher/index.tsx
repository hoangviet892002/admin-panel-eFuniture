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
  voucherName: string;
  startDate: string;
  endDate: string;
  percent: number;
  number: number;
  minimumOrderValue: number;
  maximumDiscountAmount: number;
}
interface Field<T> {
  id: keyof T;
  label: string;
  type: "string" | "number" | "image" | "date";
}

const initialVouchers: Voucher = {
  id: "",
  voucherName: "",
  startDate: "",
  endDate: "",
  percent: 0,
  number: 0,
  minimumOrderValue: 0,
  maximumDiscountAmount: 0,
};

const UpdateVoucherPages = () => {
  const [load, setLoad] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [Voucher, setVoucher] = useState<Voucher>(initialVouchers);
  const { id } = useParams();
  const fields: Field<Voucher>[] = [
    { id: "voucherName", label: "Tên Voucher", type: "string" },
    { id: "startDate", label: "Ngày bắt đầu", type: "date" },
    { id: "endDate", label: "Ngày kết thúc", type: "date" },
    { id: "number", label: "Số lần sử dụng", type: "number" },
    { id: "percent", label: "Giá trị sử dụng (%)", type: "number" },
    { id: "minimumOrderValue", label: "Đơn hàng tối thiểu", type: "number" },
    { id: "maximumDiscountAmount", label: "Đơn hàng tối đa", type: "number" },
  ];
  const fetchVoucher = async () => {
    setLoading(true);

    const response = await VoucherService.getVoucherById(`${id}`);
    setVoucher(response);
    setLoading(false);
  };
  useEffect(() => {
    fetchVoucher();
  }, [load]);

  const handleSave = async (updatedVoucher: Voucher) => {
    setLoading(true);
    await VoucherService.updateVoucher(updatedVoucher);
    setLoading(false);
    setLoad(!load);
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
            onSave={handleSave}
          />
        )}
      </Box>
    </Box>
  );
};
export default UpdateVoucherPages;
