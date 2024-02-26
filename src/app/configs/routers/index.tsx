import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  HomePage,
  LoginPage,
  AccountPage,
  AppointmentPage,
  OrderPage,
  OrderProcessingPage,
  ProductPage,
  TransactionsPage,
  VoucherPage,
  Feedbacks,
  AddPrductPage,
  AddVoucherPage,
  AddQuantityProductPage,
  AppointmentDetailsPage,
  UpdateProductPage,
  UpdateAccountPage,
  UpdateVoucherPages,
} from "../../../pages";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route path="" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="accounts">
            <Route path="" element={<AccountPage />} />
            <Route path=":id" element={<UpdateAccountPage />} />
          </Route>
          <Route path="appointments">
            <Route path="" element={<AppointmentPage />} />
            <Route path=":id" element={<AppointmentDetailsPage />} />
          </Route>

          <Route path="orders" element={<OrderPage />} />
          <Route path="order-processing" element={<OrderProcessingPage />} />
          <Route path="products">
            <Route path="" element={<ProductPage />} />
            <Route path=":id" element={<UpdateProductPage />} />
            <Route path="add" element={<AddPrductPage />} />
            <Route path="add-quantity" element={<AddQuantityProductPage />} />
          </Route>

          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="vouchers">
            <Route path="" element={<VoucherPage />} />
            <Route path="add" element={<AddVoucherPage />} />
            <Route path=":id" element={<UpdateVoucherPages />} />
          </Route>
          <Route path="feedbacks" element={<Feedbacks />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Routers;
