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
  1: "Pending",
  2: "To Ship",
  3: "Cancel",
  4: "Recieve",
  5: "Refuse to Confirm",
};

const OrderPage = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [orders, setOrders] = useState([]);
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

    fetchOrders();
    if (orders.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);

      fetchOrders();
    }
    setLoading(false);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const columns = [
    { id: "name", label: "Customer Name", minWidth: 170 },
    { id: "address", label: "Address", minWidth: 170 },
    { id: "price", label: "Total Value", minWidth: 170 },
    {
      id: "status",
      label: "Status",
      minWidth: 170,
      format: (value: number) => statusLabels[value] || "Unknown",
    },
  ];

  const fetchOrders = async () => {
    const response = await OrderService.getOrdersByPage(
      currentPage,
      searchTerm
    );
    setOrders(response.items);
    setTotalPages(response.totalPagesCount);
  };
  const fetchOrdersDelete = async (Id: string) => {
    OrderService.deleteOrder(Id);
  };
  const fetchOrdersUpdateStatus = async (Id: string, newStatus: number) => {
    await OrderService.updateOrderStatus(Id, newStatus);
    setLoad(!load);
  };
  useEffect(() => {
    setLoading(true);

    fetchOrders();
    setLoading(false);
  }, [currentPage, searchTerm, load]);

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Order List
        </Typography>
        <TextField
          label="Search"
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
