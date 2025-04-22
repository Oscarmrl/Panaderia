import {
  Navegacion,
  Baner,
  ProductDetail,
  Products,
  OtrasOpciones,
  Cart,
  FooterMenu,
} from "./Components";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useReducer } from "react";
import { initialState, comprasReducer } from "./reducers";

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
        <Route path="/Panaderia/cart" element={<Cart />} />

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
