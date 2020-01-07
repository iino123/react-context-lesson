import React, { createContext, useState, useEffect } from "react";

import { addItemToCart, removeItemFromCart } from "./cart.utils";

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
  cartItemsCount: 0
});

const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const toggleHidden = () => setHidden(!hidden);

  useEffect(() => {
    // TODO: ロジック部分はutilに移動
    const Count = cartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity,
      0
    );
    const totalPrice = cartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
      0
    );
    console.log(totalPrice);
    setCartItemsCount(Count);
    setTotalPrice(totalPrice);
  }, [cartItems]);

  // addItemToCart(item)の返り値が新たなカート内の状態を返す->それをsetCartItemでローカルステートにセットする
  const addItem = item => setCartItems(addItemToCart(cartItems, item));
  const removeItem = item => setCartItems(removeItemFromCart(cartItems, item));

  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleHidden,
        cartItems,
        addItem,
        removeItem,
        cartItemsCount,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
