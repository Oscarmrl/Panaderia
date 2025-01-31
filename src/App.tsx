import MenuInferior from "./Components/Footer/FooterMenu";
import Navegacion from "./Components/Home/Navegacion";
import Products from "./Components/Productos/Products";

function App() {
  return (
    <>
      <Navegacion />
      <div className="flex flex-col min-h-screen">
  <div className="flex-grow">
    <Products />
  </div>
  <MenuInferior />
</div>

    </>
  );
}

export default App;
