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

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useReducer } from "react";
import { initialState, comprasReducer } from "./reducers";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "Ae6J5LA_I8y4mIkMJxceS71Q3Y5_2HzUwFFYftq8vahkiQ6vxbrH4py8xwBBT0WTNXZKsq-0HdKqIqlK",
      }}
    >
      <Router>
        <MainContent />
      </Router>
    </PayPalScriptProvider>
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
