import { Box, MenuItem, Select, TextField } from "@mui/material";
import {
  CustomTable,
  SidebarMenu,
  ObjectDetailsDisplay,
  Loading,
} from "../../components";
import { useEffect, useState } from "react";
import { Item, Order, Status } from "../../interface";

import OrderService from "../../service/OrderService";
import { useParams } from "react-router";
import { StatusGraph } from "../../helpers";
const initialData: Order = {
  address: "",
  amount: 0,
  customerName: "",
  id: "",
  pay: 0,
  status: 0,
};
const statusGraph = new StatusGraph();
statusGraph.addEdge(1, 2);

const OrderDetailPage = () => {
  interface Field<T> {
    id: keyof T;
    label: string;
    type: "string" | "number" | "image";
  }
  const statusLabels: Record<number, string> = {
    1: "Pending",
    2: "Accepts",
    3: "Cancel",
    4: "Require Again",
  };
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const fields: Field<Order>[] = [
    { id: "customerName", label: "Name", type: "string" },
    { id: "address", label: "Địa chỉ", type: "string" },
    { id: "amount", label: "Giá trị", type: "string" },
    { id: "pay", label: "Trả trước", type: "string" },
  ];
  const columnsStatus = [
    { id: "date", label: "Ngày cập nhật", minWidth: 150 },
    {
      id: "status",
      label: "Trạng thái",
      minWidth: 150,
      format: (value: number) => statusLabels[value],
    },
  ];
  const columnsItem = [
    { id: "name", label: "Sản phẩm", minWidth: 150 },
    {
      id: "price",
      label: "Giá trị",
      minWidth: 150,
    },
    {
      id: "quantity",
      label: "Số lượng",
      minWidth: 150,
    },
  ];
  const [data, setData] = useState<Order>(initialData);
  const [status, setStatus] = useState<Status[]>([]);
  const [item, setItem] = useState<Item[]>([]);
  const fetchItem = async () => {
    const response = await OrderService.getOrderItem(`${id}`);
    setItem(response);
  };
  const fetchStatus = async () => {
    const response = await OrderService.getOrderStatus(`${id}`);
    setStatus(response);
  };
  const fetchData = async () => {
    const response = await OrderService.getOrderById(`${id}`);
    setData(response);
  };

  useEffect(() => {
    setLoading(true);
    fetchItem();
    fetchData();
    fetchStatus();
    setLoading(false);
  });
  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          "& > *": {
            marginBottom: 2,
          },
        }}
      >
        {" "}
        {loading ? (
          <Loading />
        ) : (
          <>
            <ObjectDetailsDisplay data={data} fields={fields} />
            <CustomTable columns={columnsStatus} data={status} />
            <CustomTable columns={columnsItem} data={item} />
            <TextField value={statusLabels[data.status]} label="Trạng thái" />
            <Select value={data.status}>
              {statusGraph.getNextStates(data.status).map((nextState) => (
                <MenuItem value={nextState}>
                  {statusLabels ? statusLabels[nextState] : nextState}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
      </Box>
    </Box>
  );
};

export default OrderDetailPage;
