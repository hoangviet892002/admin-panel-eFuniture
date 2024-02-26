import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { ObjectUpdateForm, SidebarMenu } from "../../components";
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
    try {
      const response = await VoucherService.getVoucherById(`${id}`);
      setVoucher(response);
    } catch (error) {
      console.error("Failed toget Voucher", error);
    }
  };
  useEffect(() => {
    fetchVoucher();
  }, []);

  const handleSave = async (updatedVoucher: Voucher) => {
    try {
      const response = VoucherService.updateVoucher(updatedVoucher);
      //   console.log("Update voucher response:", response);
      //   toast.success("Sửa thành công!");
    } catch (error) {
      toast.error("Sửa thất bại. Vui lòng kiểm tra lại thông tin!");
      console.error("Add error:", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Chỉnh sửa sản phẩm
        </Typography>
        <ObjectUpdateForm
          data={Voucher}
          fields={fields}
          onSave={() => handleSave(Voucher)}
        />
      </Box>
    </Box>
  );
};
export default UpdateVoucherPages;
