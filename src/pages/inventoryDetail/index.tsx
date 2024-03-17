import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  CustomTable,
  Loading,
  ObjectDetailsDisplay,
  SidebarMenu,
} from "../../components";
import { Import, Item, Status } from "../../interface";

import { useParams } from "react-router";
import { StatusGraph } from "../../helpers";
import { ImportService } from "../../service";
const initialData: Import = {
  id: "",
  status: 0,
  name: "",
  price: 0,
};
const statusGraph = new StatusGraph();
statusGraph.addEdge(1, 2);
statusGraph.addEdge(1, 3);

const InventoryDetailPage = () => {
  interface Field<T> {
    id: keyof T;
    label: string;
    type: "string" | "number" | "image";
  }
  const statusLabels: Record<number, string> = {
    1: "Pending",
    2: "Accepts",
    3: "Cancel",
  };
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const fields: Field<Import>[] = [
    { id: "name", label: "Title", type: "string" },
    { id: "price", label: "Total value", type: "string" },
  ];

  const columnsItem = [
    { id: "name", label: "Product name", minWidth: 150 },
    {
      id: "price",
      label: "Value",
      minWidth: 150,
    },
    {
      id: "quantity",
      label: "Quantity",
      minWidth: 150,
    },
  ];
  const [data, setData] = useState<Import>(initialData);
  const [status, setStatus] = useState<Status[]>([]);
  const [item, setItem] = useState<Item[]>([]);
  const fetchItem = async () => {
    const response = await ImportService.getImportById(`${id}`);
    setItem(response.importDetailViewDTOs);
    setData(response);
  };

  useEffect(() => {
    setLoading(true);
    fetchItem();

    setLoading(false);
  });
  const handleStatusChange = async (event: SelectChangeEvent<number>) => {
    let newStatus = event.target.value;
    await ImportService.changeStatus(`${id}`, String(newStatus));
  };
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
            <TextField value={statusLabels[data.status]} label="" />
            <Select value={data.status} onChange={handleStatusChange}>
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

export default InventoryDetailPage;
