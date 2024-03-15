import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
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
const initialData: OrderDTO = {
  address: "",
  email: "",
  name: "",
  phoneNumber: "",
  price: "",
  id: "",
  status: 0,
};
const statusGraph = new StatusGraph();
statusGraph.addEdge(1, 2);
statusGraph.addEdge(1, 5);
statusGraph.addEdge(2, 3);
statusGraph.addEdge(1, 3);
statusGraph.addEdge(2, 4);
interface OrderDTO {
  id: string;
  price: string;
  phoneNumber: string;
  email: string;
  address: string;
  name: string;
  status: number;
}
const OrderDetailPage = () => {
  interface Field<T> {
    id: keyof T;
    label: string;
    type: "string" | "number" | "image";
  }
  const statusLabels: Record<number, string> = {
    1: "Chờ Xác Nhận",
    2: "Đang Giao Hàng",
    3: "Bị Hủy",
    4: "Đã Giao Hàng",
    5: "Từ Chối Xác Nhận",
  };
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);
  const fields: Field<OrderDTO>[] = [
    { id: "phoneNumber", label: "Số liên lạc", type: "string" },
    { id: "email", label: "Mail", type: "string" },
    { id: "address", label: "Địa chỉ", type: "string" },
    { id: "name", label: "tên nhận", type: "string" },
    { id: "price", label: "Giá", type: "string" },
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
  const [data, setData] = useState(initialData);

  const [item, setItem] = useState<Item[]>([]);
  const fetchItem = async () => {
    const response = await OrderService.getOrderItem(`${id}`);
    setItem(response);
  };

  const fetchData = async () => {
    const response = await OrderService.getOrderById(`${id}`);
    setData(response);
  };
  const handleChange = async (event: SelectChangeEvent<number>) => {
    const selectedStatus = event.target.value;
    await OrderService.updateOrderStatus(`${id}`, selectedStatus);
    setLoad(!load);
  };

  useEffect(() => {
    setLoading(true);
    fetchItem();
    fetchData();
    setLoading(false);
  }, [load]);
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

            <CustomTable columns={columnsItem} data={item} />
            <TextField value={statusLabels[data.status]} />
            <Select value={data.status} onChange={handleChange}>
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
