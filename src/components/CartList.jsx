/* eslint-disable react/prop-types */
const CartList = ({ cartItems, setQuantity, setCartItems, isConfirmOrder }) => {
  const calculateTotalPerItem = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      return item.quantity * item.price;
    }
    return 0;
  };

  // Hitung total harga item yang ada di keranjang
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleRemoveItem = (itemId) => {
    setQuantity((prev) => ({
      ...prev,
      [itemId]: 0,
    }));

    setCartItems((prev) => {
      const updateCart = prev.map((item) =>
        item.id === itemId ? { ...item, quantity: 0 } : item
      );
      // Hapus dari keranjang jika quantitynya 0
      return updateCart.filter((item) => item.quantity > 0);
    });
  };
  return (
    <ul>
      {cartItems.map((item) => (
        <li
          key={item.id}
          className="flex justify-between items-center gap-5 mb-5 border-b-2 p-3"
        >
          <div>
            <h3 className="text-rose-900 red-hat-text-bold mb-1">
              {item.name}
            </h3>
            <div className="flex gap-3">
              <div className="text-red red-hat-text-bold">{item.quantity}x</div>
              <div className="red-hat-text-regular text-rose-500 ">
                @{item.price}
              </div>
              {isConfirmOrder === false && (
                <div className="text-rose-500 red-hat-text-bold">
                  Rp. {calculateTotalPerItem(item.id)}
                </div>
              )}
            </div>
          </div>
          <div
            onClick={() => handleRemoveItem(item.id)}
            className="border-2 border-rose-300 rounded-full p-1 cursor-pointer hover:bg-red"
          >
            <img src="./assets/images/icon-remove-item.svg" alt="" />
          </div>
        </li>
      ))}
      <li className="flex justify-between items-center p-3">
        <p className="red-hat-text-bold text-rose-500">Total Pesanan</p>
        <p className="red-hat-text-extrabold text-3xl text-rose-900">
          Rp. {calculateTotal()}
        </p>
      </li>
    </ul>
  );
};

export default CartList;
