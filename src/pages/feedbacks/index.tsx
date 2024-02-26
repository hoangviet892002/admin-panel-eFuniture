import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { CustomTable, SidebarMenu, Pagination } from "../../components";
import { StatusGraph } from "../../helpers";

const statusGraph = new StatusGraph();
statusGraph.addEdge(1, 2);
statusGraph.addEdge(2, 1);

const statusLabels: Record<number, string> = {
  1: "Chưa phản hồi",
  2: "Đã phản hồi",
};

const initialData = [
  {
    id: "1",
    customerName: "Nguyễn Văn A",
    product: "Ghế tình yêu",
    status: 1,
  },
  {
    id: "2",
    customerName: "Nguyễn Văn A",
    product: "Máy rung lắc châu phi",
    status: 2,
  },
];

const FeedbacksPage = () => {
  const [feedbacks, setFeedbacks] = useState(initialData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages: number = 40;
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleStatusChange = (feedbackId: string, newStatus: number) => {
    const updatedFeedbacks = feedbacks.map((feedbacks) =>
      feedbacks.id === feedbackId
        ? { ...feedbacks, status: newStatus }
        : feedbacks
    );
    setFeedbacks(updatedFeedbacks);
  };
  const handleEdit = (rowId: string) => {
    console.log("Edit", rowId);
  };

  const handleDelete = (id: string) => {
    setFeedbacks((current) => current.filter((feedback) => feedback.id !== id));
    console.log("Delete", id);
  };

  const columns = [
    { id: "customerName", label: "Tên Khách Hàng", minWidth: 170 },
    { id: "product", label: "Sản phẩm", minWidth: 170 },
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
          Danh Sách Feedback Khách hàng
        </Typography>
        <CustomTable
          columns={columns}
          data={feedbacks}
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

export default FeedbacksPage;
