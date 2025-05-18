import { useState } from 'react';
import Cart from './components/Cart';
import ListMenu from './components/ListMenu';
import OrderConfirmed from './components/OrderConfirmed';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [isConfirmOrder, setIsConfirmOrder] = useState(false);
  return (
    <main className="p-6 bg-rose-50 flex flex-col md:flex-row gap-5 md:p-14">
      <div className="menu-list-container md:w-3/4">
        <h1 className="red-hat-text-extrabold text-3xl mb-5 text-rose-900">
          Desserts
        </h1>
        <ListMenu
          cartItems={cartItems}
          setCartItems={setCartItems}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>
      <Cart
        cartItems={cartItems}
        setCartItems={setCartItems}
        setQuantity={setQuantity}
        isConfirmOrder={isConfirmOrder}
        setIsConfirmOrder={setIsConfirmOrder}
      />
      {isConfirmOrder && (
        <OrderConfirmed
          cartItems={cartItems}
          setCartItems={setCartItems}
          setQuantity={setQuantity}
          setIsConfirmOrder={setIsConfirmOrder}
        />
      )}
    </main>
  );
};

export default App;
