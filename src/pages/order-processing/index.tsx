import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { CustomTable, SidebarMenu, Pagination } from "../../components";
import { StatusGraph } from "../../helpers";

const statusGraph = new StatusGraph();
statusGraph.addEdge(1, 2);
statusGraph.addEdge(1, 3);
statusGraph.addEdge(2, 3);
statusGraph.addEdge(2, 6);
statusGraph.addEdge(3, 2);
statusGraph.addEdge(3, 6);
statusGraph.addEdge(2, 4);
statusGraph.addEdge(4, 5);
statusGraph.addEdge(5, 6);

const statusLabels: Record<number, string> = {
  1: "Chuẩn bị bắt đầu",
  2: "Đang tiến hành",
  3: "Trì hoãn",
  4: "Hoàn thiện",
  5: "Đã bàn giao",
  6: "Đóng dự án",
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
    customerName: "Nguyễn Văn A",
    address: "123 Đường ABC",
    status: 1,
  },
];

const OrderProcessingPage = () => {
  const [orderProcessings, setOrderProcessings] = useState(initialData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages: number = 40;
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleStatusChange = (orderId: string, newStatus: number) => {
    const updatedOrders = orderProcessings.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrderProcessings(updatedOrders);
  };
  const handleEdit = (rowId: string) => {
    console.log("Edit", rowId);
  };

  const handleDelete = (rowId: string) => {
    console.log("Delete", rowId);
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
          Danh Sách Các Tiến Trình
        </Typography>
        <CustomTable
          columns={columns}
          data={orderProcessings}
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

export default OrderProcessingPage;
