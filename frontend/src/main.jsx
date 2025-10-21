import "./index.css";
import store from "./app/store";
import Layout from "./pages/Layout";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { lazy, StrictMode } from "react";
import { createRoutesFromElements, createBrowserRouter, Route, RouterProvider } from "react-router";
import { Toaster } from "./components/ui/sonner";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Logout = lazy(() => import("./pages/Logout"));
const AddBlog = lazy(() => import("./pages/AddBlog"));
const EditBlog = lazy(() => import("./pages/EditBlog"));
const DeleteBlog = lazy(() => import("./pages/DeleteBlog"));
const Blog = lazy(() => import("./pages/Blog"));
const NotFound = lazy(() => import("./pages/NotFound"));
const SitePolicy = lazy(() => import("./pages/SitePolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Contact = lazy(() => import("./pages/Contact"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="contact" element={<Contact />} />
      <Route path="logout" element={<Logout />} />
      <Route path="privacy-policy" element={<SitePolicy />} />
      <Route path="terms-of-service" element={<TermsOfService />} />
      <Route path="blog/add" element={<AddBlog />} />
      <Route path="blog/edit/:blogId" element={<EditBlog />} />
      <Route path="blog/delete/:blogId" element={<DeleteBlog />} />
      <Route path="blog/view/:blogId" element={<Blog />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </StrictMode>,
);
