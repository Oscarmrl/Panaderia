import {
  Navegacion,
  Baner,
  ProductDetail,
  Products,
  OtrasOpciones,
  Cart,
  FooterMenu,
  Favoritos,
} from "./Components";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useReducer } from "react";
import { initialState, comprasReducer } from "./reducers";
import Order from "./Components/Carrito/Order";

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

  const showBaner = location.pathname === "/Panaderia";
  const showNavegacion =
    location.pathname === "/Panaderia" ||
    location.pathname === "/Panaderia/cart";

  const [state, dispatch] = useReducer(comprasReducer, initialState);

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
              <Cart cart={state.cart} dispatch={dispatch} />
              <Order cart={state.cart} />
            </div>
          }
        />
        <Route path="/Panaderia/favoritos" element={<Favoritos />} />

        <Route
          path="/Panaderia/product/:id"
          element={
            <>
              <ProductDetail cart={state?.cart} dispatch={dispatch} />
              <OtrasOpciones cart={state.cart} dispatch={dispatch} />
            </>
          }
        />
      </Routes>
      {showNavegacion && <FooterMenu />}{" "}
    </>
  );
}

export default App;
