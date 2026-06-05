import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddBlog from "./pages/admin/AddBlog";
import ListBlog from "./pages/admin/ListBlog";
import Comments from "./pages/admin/Comments";
import AdminLogin from "./components/admin/Login";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import MyArticles from "./pages/dashboard/MyArticles";
import CreateArticle from "./pages/dashboard/CreateArticle";
import "quill/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const { token, user } = useAppContext();

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route
          path="/admin"
          element={
            token && user?.role === "admin" ? <Layout /> : <AdminLogin />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>
        <Route
          path="/dashboard"
          element={token ? <DashboardLayout /> : <Login />}
        >
          <Route index element={<MyArticles />} />
          <Route path="create" element={<CreateArticle />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
