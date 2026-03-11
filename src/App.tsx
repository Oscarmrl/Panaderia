import {
  Navegacion,
  Baner,
  ProductDetail,
  Products,
  OtrasOpciones,
  Cart,
  FooterMenu,
  Favoritos,
  Order,
} from "./Components";
import AdminLayout from "./admin/AdminLayout";
import Login from "./auth/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminRoute from "./auth/AdminRoute";
import Register from "./auth/Register";
import Profile from "./auth/Profile";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Dashboard from "./admin/Dashboard";
import EditProducts from "./admin/EditProducts";
import AddProducts from "./admin/AddProducts";
import OrdersAdmin from "./admin/OrdersAdmin";

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();

  const showBaner = location.pathname === "/";

  return (
    <>
      <Navegacion />
      {showBaner && <Baner />}{" "}
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart"
          element={
            <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 ">
              <ProtectedRoute>
                <Cart />

                <Order />
              </ProtectedRoute>
            </div>
          }
        />

        <Route
          path="/favoritos"
          element={
            <ProtectedRoute>
              <Favoritos />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/:id"
          element={
            <>
              <ProductDetail />
              <OtrasOpciones />
            </>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/Dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/Edit_Products"
          element={
            <AdminRoute>
              <EditProducts />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/Add_Products"
          element={
            <AdminRoute>
              <AddProducts />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/Orders"
          element={
            <AdminRoute>
              <OrdersAdmin />
            </AdminRoute>
          }
        />
      </Routes>
      <FooterMenu />
    </>
  );
}

export default App;
