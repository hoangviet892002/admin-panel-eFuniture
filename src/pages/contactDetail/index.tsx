import { Box, MenuItem, Select, TextField } from "@mui/material";
import {
  CustomTable,
  SidebarMenu,
  ObjectDetailsDisplay,
  Loading,
  ObjectUpdateForm,
} from "../../components";
import { useEffect, useState } from "react";
import { Contact, Item, Order, Status } from "../../interface";

import {
  OrderService,
  ContactService,
  OrderProcessingService,
} from "../../service";
import { useParams } from "react-router";
import { StatusGraph } from "../../helpers";
const initialData: Contact = {
  id: "",
  description: "",
  title: "",
  nameCustomer: "",
  pay: 0,
  status: 0,
  value: 0,
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
    { id: "nameCustomer", label: "Name", type: "string" },
    { id: "title", label: "Tiêu đề", type: "string" },
    { id: "description", label: "Nội dung", type: "string" },
    { id: "value", label: "Giá trị", type: "string" },
    { id: "pay", label: "Trả trước", type: "string" },
  ];
  const fieldUpdate: Field<Contact>[] = [
    { id: "title", label: "Tiêu đề", type: "string" },
    { id: "description", label: "Nội dung", type: "string" },
    { id: "value", label: "Giá trị", type: "string" },
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
    {
      id: "status",
      label: "Trạng thái",
      minWidth: 150,
      format: (value: number) => statusOrderLabels[value] || "Unknown",
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
  };
  const handleStatusChange = (id: string, newStatus: number) => {
    OrderProcessingService.updateStatus(id, newStatus);
    setLoading(true);
    fetchItem();
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchItem();
    fetchData();
    fetchStatus();
    setLoading(false);
  });
  const save = (data: Contact) => {
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
            {data.status === 4 ? (
              <ObjectUpdateForm
                onSave={save}
                data={data}
                fields={fieldUpdate}
              />
            ) : (
              <ObjectDetailsDisplay data={data} fields={fields} />
            )}

            <CustomTable columns={columnsStatus} data={status} />
            <CustomTable
              columns={columnsItem}
              data={item}
              onStatusChange={handleStatusChange}
              statusLabels={statusOrderLabels}
              statusGraph={statusGraph}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default ContactDetailPage;
