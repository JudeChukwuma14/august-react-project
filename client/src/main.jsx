import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { mainRouter } from './router/mainRouter';
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer position="top-right" autoClose={4000}/>
    <RouterProvider router={mainRouter} />
  </StrictMode>
);
