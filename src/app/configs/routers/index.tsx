import React, { useEffect, useState } from "react";
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
  CategoryPage,
} from "../../../pages";
import Protected from "./Protected";
import { AuthService } from "../../../service";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route
            path=""
            element={
              <Protected>
                <HomePage />
              </Protected>
            }
          />
          <Route
            path="categories"
            element={
              <Protected>
                <CategoryPage />
              </Protected>
            }
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="accounts">
            <Route
              path=""
              element={
                <Protected>
                  <AccountPage />
                </Protected>
              }
            />
            <Route
              path=":id"
              element={
                <Protected>
                  <UpdateAccountPage />
                </Protected>
              }
            />
          </Route>
          <Route path="appointments">
            <Route
              path=""
              element={
                <Protected>
                  <AppointmentPage />
                </Protected>
              }
            />
            <Route
              path=":id"
              element={
                <Protected>
                  <AppointmentDetailsPage />
                </Protected>
              }
            />
          </Route>

          <Route
            path="orders"
            element={
              <Protected>
                <OrderPage />
              </Protected>
            }
          />
          <Route
            path="order-processing"
            element={
              <Protected>
                <OrderProcessingPage />
              </Protected>
            }
          />
          <Route path="products">
            <Route
              path=""
              element={
                <Protected>
                  <ProductPage />
                </Protected>
              }
            />
            <Route
              path=":id"
              element={
                <Protected>
                  <UpdateProductPage />
                </Protected>
              }
            />
            <Route
              path="add"
              element={
                <Protected>
                  <AddPrductPage />
                </Protected>
              }
            />
            <Route
              path="add-quantity"
              element={
                <Protected>
                  <AddQuantityProductPage />
                </Protected>
              }
            />
          </Route>

          <Route
            path="transactions"
            element={
              <Protected>
                <TransactionsPage />
              </Protected>
            }
          />
          <Route path="vouchers">
            <Route
              path=""
              element={
                <Protected>
                  <VoucherPage />
                </Protected>
              }
            />
            <Route
              path="add"
              element={
                <Protected>
                  <AddVoucherPage />
                </Protected>
              }
            />
            <Route
              path=":id"
              element={
                <Protected>
                  <UpdateVoucherPages />
                </Protected>
              }
            />
          </Route>
          <Route
            path="feedbacks"
            element={
              <Protected>
                <Feedbacks />
              </Protected>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default Routers;