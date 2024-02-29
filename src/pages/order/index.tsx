import React, { useState, useEffect } from "react";
import { Box, Typography, TextField } from "@mui/material";
import {
  CustomTable,
  SidebarMenu,
  Pagination,
  Loading,
} from "../../components";
import { StatusGraph } from "../../helpers";
import { Order } from "../../interface";
import OrderService from "../../service/OrderService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

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

const OrderPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {}, [searchTerm, currentPage]);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleStatusChange = (orderId: string, newStatus: number) => {
    setLoading(true);
    fetchOrdersUpdateStatus(orderId, newStatus);
    setLoading(false);
  };
  const handleEdit = (id: string) => {
    navigate(`${id}`);
  };

  const handleDelete = (id: string) => {
    setLoading(true);
    fetchOrdersDelete(id);
    fetchTotalPages();
    fetchOrders();
    if (orders.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchTotalPages();
      fetchOrders();
    }
    setLoading(false);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const columns = [
    { id: "customerName", label: "Tên Khách Hàng", minWidth: 170 },
    { id: "address", label: "Địa Chỉ", minWidth: 170 },
    { id: "amount", label: "Tổng đơn", minWidth: 170 },
    { id: "pay", label: "Cần trả thêm", minWidth: 170 },
    {
      id: "status",
      label: "Trạng Thái",
      minWidth: 170,
      format: (value: number) => statusLabels[value] || "Unknown",
    },
  ];
  const fetchTotalPages = async () => {
    const response = await OrderService.getTotalPages(searchTerm);
    setTotalPages(response);
  };
  const fetchOrders = async () => {
    const response = await OrderService.getOrdersByPage(
      currentPage,
      searchTerm
    );
    setOrders(response);
  };
  const fetchOrdersDelete = async (Id: string) => {
    OrderService.deleteOrder(Id);
  };
  const fetchOrdersUpdateStatus = async (Id: string, newStatus: number) => {
    OrderService.updateOrderStatus(Id, newStatus);
  };
  useEffect(() => {
    setLoading(true);
    fetchTotalPages();
    fetchOrders();
    setLoading(false);
  }, [currentPage, searchTerm]);

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
        {loading ? (
          <Loading />
        ) : (
          <>
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
          </>
        )}
      </Box>
    </Box>
  );
};

export default OrderPage;
