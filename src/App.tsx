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

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();

  const showBaner = location.pathname === "/Panaderia";

  return (
    <>
      <Navegacion />
      {showBaner && <Baner />}{" "}
      <Routes>
        <Route path="/Panaderia" element={<Products />} />
        <Route
          path="/Panaderia/cart"
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
          path="/Panaderia/favoritos"
          element={
            <ProtectedRoute>
              <Favoritos />
            </ProtectedRoute>
          }
        />

        <Route path="/Panaderia/login" element={<Login />} />
        <Route path="/Panaderia/register" element={<Register />} />

        <Route
          path="/Panaderia/product/:id"
          element={
            <>
              <ProductDetail />
              <OtrasOpciones />
            </>
          }
        />

        <Route
          path="/Panaderia/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        />
      </Routes>
      <FooterMenu />
    </>
  );
}

export default App;
