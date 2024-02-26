import React, { useState, useEffect } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { CustomTable, SidebarMenu, Pagination } from "../../components";
import { StatusGraph } from "../../helpers";

const statusGraph = new StatusGraph();
statusGraph.addEdge(1, 2);
statusGraph.addEdge(1, 5);
statusGraph.addEdge(2, 3);
statusGraph.addEdge(1, 3);
statusGraph.addEdge(2, 4);

const statusLabels: Record<number, string> = {
  1: "Chờ Xác Nhận",
  2: "Đang Giao Hàng",
  3: "Bị Hủy",
  4: "Đã Giao Hàng",
  5: "Từ Chối Xác Nhận",
};

const initialData = [
  {
    id: "1",
    customerName: "Nguyễn Văn A",
    address: "123 Đường ABC",
    status: 1,
  },
  {
    id: "2",
    customerName: "Nguyễn Văn B",
    address: "123 Đường ABC",
    status: 2,
  },
];

const OrderPage = () => {
  const [originalOrders] = useState(initialData);
  const [orders, setOrders] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages: number = 40;
  useEffect(() => {
    const filteredOrders = initialData.filter((order) =>
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setOrders(filteredOrders);
  }, [searchTerm, originalOrders]);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleStatusChange = (orderId: string, newStatus: number) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };
  const handleEdit = (rowId: string) => {
    console.log("Edit", rowId);
  };

  const handleDelete = (rowId: string) => {
    console.log("Delete", rowId);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const columns = [
    { id: "customerName", label: "Tên Khách Hàng", minWidth: 170 },
    { id: "address", label: "Địa Chỉ", minWidth: 170 },
    {
      id: "status",
      label: "Trạng Thái",
      minWidth: 170,
      format: (value: number) => statusLabels[value] || "Unknown",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Danh Sách Đơn Hàng
        </Typography>
        <TextField
          label="Tìm kiếm theo khách hàng"
          variant="outlined"
          onChange={handleSearchChange}
          style={{ marginLeft: 20 }}
        />
        <CustomTable
          columns={columns}
          data={orders}
          onStatusChange={handleStatusChange}
          statusLabels={statusLabels}
          statusGraph={statusGraph}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <Pagination
          total={totalPages}
          selected={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default OrderPage;
