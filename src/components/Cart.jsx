import { useState } from 'react';
import CartList from './CartList';
import Payment from './Payment';
import OrderConfirmed from './OrderConfirmed';

/* eslint-disable react/prop-types */
const Cart = ({ cartItems, setQuantity, setCartItems, isConfirmOrder, setIsConfirmOrder, address, setAddress }) => {
  const [showPayment, setShowPayment] = useState(false);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleConfirmOrder = () => {
    // Jika ada item di keranjang, tampilkan halaman pembayaran
    if (cartItems.length > 0) {
      setShowPayment(true);
    }
  };

  const handlePaymentSuccess = (address) => {
    // Setelah pembayaran berhasil, tampilkan halaman konfirmasi order
    setShowPayment(false);
    setIsConfirmOrder(true);
    console.log("Alamat dari Payment:", address);
  };

  const handleCancelPayment = () => {
    // Jika pengguna membatalkan pembayaran, kembali ke keranjang
    setShowPayment(false);
  };

  return (
    <>
      <div className="cart-container mt-5 md:mt-0 bg-white p-6 md:w-1/4 rounded-lg">
        <h2 className="text-red red-hat-text-extrabold text-2xl mb-6">
          Keranjang ({totalQuantity})
        </h2>

        {cartItems.length <= 0 ? (
          <div>
            <img
              src="./assets/images/illustration-empty-cart.svg"
              alt=""
              className="mx-auto"
            />
            <p className="text-center mt-3">Item yang kamu tambahkan akan muncul disini</p>
          </div>
        ) : (
          <div>
            <CartList
              cartItems={cartItems}
              setQuantity={setQuantity}
              setCartItems={setCartItems}
              isConfirmOrder={isConfirmOrder}
              setIsConfirmOrder={setIsConfirmOrder}
            />
            <button
              onClick={handleConfirmOrder}
              className="bg-red text-rose-100 rounded-full p-3 w-full text-center mt-5 hover:bg-rose-900 transition-colors duration-300"
            >
              Buat Pesanan
            </button>
          </div>
        )}
      </div>

      {/* Komponen Payment */}
      {showPayment && (
        <Payment
          cartItems={cartItems}
          onPaymentSuccess={handlePaymentSuccess}
          onCancel={handleCancelPayment}
          address={address}
          setAddress={setAddress}
        />
      )}

      {/* Komponen OrderConfirmed */}
      {isConfirmOrder && (
        <OrderConfirmed
          cartItems={cartItems}
          setQuantity={setQuantity}
          setCartItems={setCartItems}
          setIsConfirmOrder={setIsConfirmOrder}
        />
      )}
    </>
  );
};

export default Cart;