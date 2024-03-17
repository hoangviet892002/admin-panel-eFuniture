import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { SidebarMenu } from "../../components";
import "./home.css";
import { useEffect, useState } from "react";
import { DashBoardService } from "../../service";
interface User {
  userName: string;
  phoneNumber: string;
  userEmail: string;
  totalMoney: number;
}

interface Product {
  id: string;
  name: string;
  image: string;
  quantitysold: number;
}
const HomePage = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [successfulOrders, setSuccessfulOrders] = useState(0);
  const [top5user, setTop5user] = useState<User[]>([]);
  const [top5product, setTop5product] = useState<Product[]>([]);
  const fetch = async () => {
    const responsetotalUsers = await DashBoardService.GetTotalUsers();
    setTotalUsers(responsetotalUsers);
    const responesetotalOrders = await DashBoardService.GetTotalProcessOder();
    setTotalOrders(responesetotalOrders);
    const responesetotalProducts = await DashBoardService.GetTotalProducts();
    setTotalProducts(responesetotalProducts);
    const responesesuccessfulOrders =
      await DashBoardService.GetTotalFinishedOrders();
    setSuccessfulOrders(responesesuccessfulOrders);
    const responseTop5user = await DashBoardService.Top5User();
    setTop5user(responseTop5user);
    const responseTop5product = await DashBoardService.Top5Product();
    setTop5product(responseTop5product);
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={3}>
          {/* Thông tin tổng quan */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  User
                </Typography>
                <Typography variant="h5">{totalUsers}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Order
                </Typography>
                <Typography variant="h5">{totalOrders}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Product
                </Typography>
                <Typography variant="h5">{totalProducts}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Successfully Order
                </Typography>
                <Typography variant="h5">{successfulOrders}</Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Top 5 Users */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Top 5 Users
                </Typography>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>User Name</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Mail</TableCell>
                        <TableCell align="right">Total Money</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {top5user.map((user, index) => (
                        <TableRow key={index}>
                          <TableCell>{user.userName}</TableCell>
                          <TableCell>{user.phoneNumber}</TableCell>
                          <TableCell>{user.userEmail}</TableCell>
                          <TableCell align="right">{user.totalMoney}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Top 5 Products */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Top 5 Products
                </Typography>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        {" "}
                        <TableCell>Image</TableCell>
                        <TableCell>Product Name</TableCell>
                        <TableCell align="right">Quantity Sold</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {top5product.map((product, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <img
                              src={product.image}
                              alt={product.name}
                              style={{ width: "50px", height: "auto" }}
                            />
                          </TableCell>
                          <TableCell>{product.name}</TableCell>

                          <TableCell align="right">
                            {product.quantitysold}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
