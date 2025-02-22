import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useReducer } from "react";

import MenuInferior from "./Components/Footer/FooterMenu";
import Baner from "./Components/Home/Baner";
import Navegacion from "./Components/Home/Navegacion";
import Products from "./Components/Productos/Products";
import ProductDetail from "./Components/Productos/ProductDetail";
import { initialState, comprasReducer } from "./reducers/compras-Reducers";

function App() {
  return (
    <Router>
      {" "}
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();

  const showBaner = !location.pathname.startsWith("/Panaderia/product");
  const showNavegacion = !location.pathname.startsWith("/Panaderia/product");

  const [state, dispatch] = useReducer(comprasReducer, initialState);

  return (
    <>
      <Navegacion />
      {showBaner && <Baner />}{" "}
      <Routes>
        <Route path="/Panaderia" element={<Products />} />

        {/* Ruta para el detalle de un producto específico */}
        <Route
          path="/Panaderia/product/:id"
          element={<ProductDetail cart={state?.cart} dispatch={dispatch} />}
        />
      </Routes>
      {showNavegacion && <MenuInferior />}{" "}
    </>
  );
}

export default App;
