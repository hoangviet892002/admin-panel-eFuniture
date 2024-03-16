import { Box, MenuItem, Select, TextField } from "@mui/material";
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

const ContactDetailPage = () => {
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
  const statusOrderLabels: Record<number, string> = {
    1: "Pending",
    2: "Accepts",
    3: "Cancel",
    4: "Require Again",
  };
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const fields: Field<Contact>[] = [
    { id: "customerContractName", label: "Name", type: "string" },
    { id: "title", label: "Tiêu đề", type: "string" },
    { id: "description", label: "Nội dung", type: "string" },
    { id: "value", label: "Giá trị", type: "string" },
    { id: "pay", label: "Trả trước", type: "string" },
    { id: "phoneNumber", label: "Phone", type: "string" },
    { id: "email", label: "Mail", type: "string" },
    { id: "address", label: "Địa chỉ", type: "string" },
  ];
  const fieldUpdate: Field<Contact>[] = [
    { id: "title", label: "Tiêu đề", type: "string" },
    { id: "description", label: "Nội dung", type: "string" },
  ];

  const columnsItem = [
    { id: "productName", label: "Sản phẩm", minWidth: 150 },
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
  const [data, setData] = useState<Contact>(initialData);
  const [status, setStatus] = useState<Status[]>([]);
  const [item, setItem] = useState<Item[]>([]);
  const fetchItem = async () => {
    const response = await ContactService.getContactItem(`${id}`);
    setItem(response);
  };
  const fetchStatus = async () => {
    const response = await ContactService.getContactStatus(`${id}`);
    setStatus(response);
  };
  const fetchData = async () => {
    const response = await ContactService.getContactById(`${id}`);
    setData(response);
    setItem(response.item);
  };
  const handleStatusChange = (id: string, newStatus: number) => {
    OrderProcessingService.updateStatus(id, newStatus);
    setLoading(true);
    fetchItem();
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    // fetchItem();
    fetchData();
    fetchStatus();
    setLoading(false);
  }, []);
  const save = (data: any) => {
    setLoading(true);
    ContactService.updateContact(data);
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
            {data.statusContract === 2 && (
              <>
                <TextField
                  value={
                    statusOrderLabels[data.statusOrderProcessing.statusCode]
                  }
                  label=""
                />

                <Select value={data.statusOrderProcessing.statusCode}>
                  {statusGraph
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
