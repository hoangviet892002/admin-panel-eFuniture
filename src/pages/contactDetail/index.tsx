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
  ObjectUpdateForm,
} from "../../components";
import { useEffect, useState } from "react";
import { Item, Order, Status } from "../../interface";

import {
  OrderService,
  ContactService,
  OrderProcessingService,
} from "../../service";
import { useParams } from "react-router";
import { StatusGraph } from "../../helpers";
interface Contact {
  id: string;
  description: string;
  title: string;
  customerContractName: string;
  pay: number;
  statusContract: number;
  value: number;
  phoneNumber: string;
  email: string;
  address: string;
  statusOrderProcessing: any;
}
const initialData: Contact = {
  id: "",
  description: "",
  title: "",
  customerContractName: "",
  pay: 0,
  statusContract: 0,
  value: 0,
  phoneNumber: "",
  email: "",
  address: "",
  statusOrderProcessing: {
    name: "string",
    statusCode: 0,
  },
};
const statusGraph = new StatusGraph();
statusGraph.addEdge(1, 2);

const statusGraphOrderProcessing = new StatusGraph();
statusGraphOrderProcessing.addEdge(1, 2);
statusGraphOrderProcessing.addEdge(1, 5);
statusGraphOrderProcessing.addEdge(2, 5);
statusGraphOrderProcessing.addEdge(3, 5);
statusGraphOrderProcessing.addEdge(2, 3);
statusGraphOrderProcessing.addEdge(4, 6);
statusGraphOrderProcessing.addEdge(5, 6);
statusGraphOrderProcessing.addEdge(6, 7);

const ContactDetailPage = () => {
  interface Field<T> {
    id: keyof T;
    label: string;
    type: "string" | "number" | "image";
  }
  const statusLabels: Record<number, string> = {
    1: "Pending",
    2: "Cancel",
    3: "Accepts",
    4: "Require Again",
  };
  const statusOrderLabels: Record<number, string> = {
    1: "Pending",
    2: "Under Construction",
    3: "Complete Construction",
    4: "Delivering",
    5: "Cancelled",
    6: "Delivered",
    7: "Rejected",
  };
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const fields: Field<Contact>[] = [
    { id: "customerContractName", label: "Name", type: "string" },
    { id: "title", label: "Title", type: "string" },
    { id: "description", label: "Description", type: "string" },
    { id: "value", label: "Value", type: "string" },
    { id: "pay", label: "Deposit", type: "string" },
    { id: "phoneNumber", label: "Phone", type: "string" },
    { id: "email", label: "Mail", type: "string" },
    { id: "address", label: "Adress", type: "string" },
  ];
  const fieldUpdate: Field<Contact>[] = [
    { id: "title", label: "Title", type: "string" },
    { id: "description", label: "Description", type: "string" },
  ];

  const columnsItem = [
    { id: "productName", label: "Product Name", minWidth: 150 },
    {
      id: "price",
      label: "Price",
      minWidth: 150,
    },
    {
      id: "quantity",
      label: "Quantity",
      minWidth: 150,
    },
  ];
  const [data, setData] = useState<Contact>(initialData);

  const [item, setItem] = useState<Item[]>([]);
  const fetchItem = async () => {
    const response = await ContactService.getContactItem(`${id}`);
    setItem(response);
  };

  const fetchData = async () => {
    const response = await ContactService.getContactById(`${id}`);
    setData(response);
    setItem(response.item);
  };

  useEffect(() => {
    setLoading(true);
    // fetchItem();
    fetchData();

    setLoading(false);
  }, []);
  const save = (data: any) => {
    setLoading(true);
    ContactService.updateContact(data);
    fetchData();

    setLoading(false);
  };

  const handleChange = async (event: SelectChangeEvent<number>) => {
    setLoading(true);
    const selectedStatus = event.target.value;
    await ContactService.updateStatusOrderProcessing(`${id}`, selectedStatus);
    fetchData();
    setLoading(false);
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
            {data.statusContract === 4 ? (
              <ObjectUpdateForm
                onSave={save}
                data={data}
                fields={fieldUpdate}
              />
            ) : (
              <>
                {" "}
                <ObjectDetailsDisplay data={data} fields={fields} />
              </>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              value={statusLabels[data.statusContract]}
              variant="outlined"
            />
            <CustomTable columns={columnsItem} data={item} />
            {data.statusContract === 3 && (
              <>
                <TextField
                  value={
                    statusOrderLabels[data.statusOrderProcessing.statusCode]
                  }
                  label=""
                />

                <Select
                  value={data.statusOrderProcessing.statusCode}
                  onChange={handleChange}
                >
                  {statusGraphOrderProcessing
                    .getNextStates(data.statusOrderProcessing.statusCode)
                    .map((nextState) => (
                      <MenuItem value={nextState}>
                        {statusOrderLabels
                          ? statusOrderLabels[nextState]
                          : nextState}
                      </MenuItem>
                    ))}
                </Select>
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ContactDetailPage;
