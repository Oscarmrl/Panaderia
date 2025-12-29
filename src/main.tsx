import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import App from "./App.tsx";
import { NavigationProvider } from "./context/NavegationContext.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PayPalScriptProvider
      options={{
        clientId:
          "AVUDDW7nuTa9sF0SAQtF6CippWVYd6NK2lSxhUY1dOIokfgjZe79HE3DwS-AGIdeN3OcIv1OdfJnXQjY",
        currency: "USD",
        intent: "capture",
      }}
    >
      <CartProvider>
        <NavigationProvider>
          <Toaster position="top-center" />
          <App />
        </NavigationProvider>
      </CartProvider>
    </PayPalScriptProvider>
  </StrictMode>
);
