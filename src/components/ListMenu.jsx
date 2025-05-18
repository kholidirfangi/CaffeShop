/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import data from '../data.json';

const ListMenu = ({ cartItems, setCartItems, quantity, setQuantity }) => {
  const [selectedItems, setselectedItems] = useState([]);
  const itemRefs = useRef([]);
  const quantityControlsRef = useRef([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Cek apakah klik terjadi di luar semua item
      const clickedOutside =
        !itemRefs.current.some((ref) => ref && ref.contains(event.target)) &&
        (!quantityControlsRef.current ||
          !quantityControlsRef.current?.contains(event.target));

      if (clickedOutside) {
        setselectedItems([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleItemClick = (itemId) => {
    setselectedItems((prevSelected) => {
      // Jika item sudah dipilih, hapus. Jika belum, tambahkan
      if (prevSelected.includes(itemId)) {
        return prevSelected.filter((id) => id !== itemId);
      } else {
        return [...prevSelected, itemId];
      }
    });
  };

  const incrementQuantity = (itemId) => {
    setQuantity((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    // Tambahkan ke keranjang jika belum ada

    const isInCart = cartItems.some((item) => item.id === itemId);

    if (!isInCart) {
      setCartItems((prev) => [
        ...prev,
        {
          id: itemId,
          ...data[itemId],
          quantity: (quantity[itemId] || 0) + 1,
        },
      ]);
    } else {
      // Update quantity jika sudah ada di keranjang
      setCartItems((prev) =>
        prev.map((item) => {
          return item.id === itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        })
      );
    }
  };

  const decrementQuantity = (itemId) => {
    setQuantity((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));

    // Update keranjang
    setCartItems((prev) => {
      const updateCart = prev.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max((item.quantity || 0) - 1, 0) }
          : item
      );
      // Hapus dari keranjang jika quantitynya 0
      return updateCart.filter((item) => item.quantity > 0);
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {data.map((item, i) => (
        <div key={i} ref={(el) => (itemRefs.current[i] = el)}>
          <div
            className={
              selectedItems === i
                ? 'relative flex justify-center border-2 border-red rounded-lg cursor-pointer'
                : 'relative flex justify-center cursor-pointer'
            }
            onClick={() => handleItemClick(i)}
          >
            <picture>
              {/* Desktop version */}
              <source media="(min-width: 1024px)" srcSet={item.image.desktop} />
              {/* Tablet version */}
              <source media="(min-width: 768px)" srcSet={item.image.tablet} />
              {/* Mobile version (default) */}
              <img
                src={item.image.mobile}
                alt={item.name}
                className="w-full h-auto rounded-lg object-cover"
              />
            </picture>
            {selectedItems.includes(i) ? (
              <div
                ref={quantityControlsRef}
                className="flex absolute -bottom-6 justify-between w-1/2 md:w-2/3 mx-auto items-center p-3 rounded-full border-2 border-red text-rose-100 red-hat-text-bold bg-red"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    decrementQuantity(i);
                  }}
                  className="px-3 text-xl font-bold red-hat-text-bold"
                >
                  <div className="group p-1 rounded-full  hover:bg-rose-100 active:bg-rose-100 border-rose-100 border-2 w-6 h-6 flex justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="2"
                      viewBox="0 0 10 2"
                      className="fill-white group-hover:fill-red"
                    >
                      <path d="M0 .375h10v1.25H0V.375Z" />
                    </svg>
                  </div>
                </button>
                <div className="mx-3 w-5 bg-red-500">{quantity[i] || 0}</div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    incrementQuantity(i);
                  }}
                  className="px-3 text-xl font-bold"
                >
                  <div className="group p-1 rounded-full hover:bg-rose-100 active:bg-rose-100 border-rose-100 border-2 w-6 h-6 flex justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      className="fill-white group-hover:fill-red"
                    >
                      <path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" />
                    </svg>
                  </div>
                </button>
              </div>
            ) : (
              <button className="flex absolute -bottom-6 justify-center w-1/2 md:w-2/3 mx-auto items-center p-3  rounded-full border-2 border-rose-400 text-rose-900 red-hat-text-bold bg-white">
                <img
                  src="./assets/images/icon-add-to-cart.svg"
                  alt=""
                  className="mr-3"
                />{' '}
                Pesan
              </button>
            )}
          </div>
          <div className="mt-10 pb-5">
            <h4 className="text-rose-400">{item.category}</h4>
            <h3 className="text-rose-900 red-hat-text-bold">{item.name}</h3>
            <h3 className="text-red red-hat-text-bold">Rp. {item.price}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListMenu;
