import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import Success from "./components/Checkout/Success";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {

  const [cartIsShown, setCartIsShown] = useState(false);
  const [checkoutIsShown, setCheckoutIsShown] = useState(false);
  const [successIsShown, setSuccessIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const showCheckoutHandler = () => {
    setCartIsShown(false);
    setCheckoutIsShown(true);
  };

  const hideCheckoutHandler = () => {
    setCheckoutIsShown(false);
  };

  const showSuccessHandler = () => {
    setCheckoutIsShown(false);
    setSuccessIsShown(true);
  }

  const hideSuccessHandler = () => {
    setSuccessIsShown(false);
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart onCheckout={showCheckoutHandler} onClick={hideCartHandler}/>}
      {checkoutIsShown && <Checkout onSuccess={showSuccessHandler} onClick={hideCheckoutHandler}/>}
      {successIsShown && <Success onClick={hideSuccessHandler}/>}
      <Header onClick={showCartHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
