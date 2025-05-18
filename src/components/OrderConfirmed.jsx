/* eslint-disable react/prop-types */
import { useRef } from "react";
import { jsPDF } from "jspdf";

const OrderConfirmed = ({
  cartItems,
  setQuantity,
  setCartItems,
  setIsConfirmOrder,
  address
}) => {
  const receiptRef = useRef(null);

  const handleStartNewOrder = () => {
    setIsConfirmOrder(false);
    setCartItems([]);
    setQuantity({});
  };

  const calculateTotalPerItem = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      return item.quantity * item.price;
    }
    return 0;
  };

  // Hitung total harga item yang ada di keranjang
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Fungsi sederhana untuk mencetak struk PDF
  // Fungsi sederhana untuk mencetak struk PDF
const cetakStruk = () => {
  const doc = new jsPDF();
  
  // Header struk
  doc.setFontSize(16);
  doc.text("STRUK PEMBELIAN", 105, 20, { align: "center" });

  // Tanggal
  const today = new Date().toLocaleDateString('id-ID');
  doc.setFontSize(10);
  doc.text(`Tanggal: ${today}`, 105, 30, { align: "center" });

  // Alamat Pengiriman
  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text("Alamat Pengiriman:", 20, 40);
  doc.setFont(undefined, 'normal');

  // Menangani alamat panjang yang perlu dibungkus
  const addressLines = doc.splitTextToSize(address, 160);
  doc.text(addressLines, 20, 45);

  // Hitung posisi Y setelah alamat
  let y = 45 + addressLines.length * 7;

  // Garis pemisah
  doc.line(20, y, 190, y);
  y += 10;

  // Header tabel
  doc.setFont(undefined, 'bold');
  doc.text("Item", 20, y);
  doc.text("Qty", 100, y);
  doc.text("Harga", 130, y);
  doc.text("Total", 170, y);

  // Data tabel
  doc.setFont(undefined, 'normal');
  y += 10;
  cartItems.forEach(item => {
    doc.text(item.name, 20, y);
    doc.text(`${item.quantity}x`, 100, y);
    doc.text(`Rp. ${item.price}`, 130, y);
    doc.text(`Rp. ${calculateTotalPerItem(item.id)}`, 170, y);
    y += 10;
  });

  // Garis total
  doc.line(20, y, 190, y);
  y += 10;

  // Total
  doc.setFont(undefined, 'bold');
  doc.text("Total Pembayaran:", 130, y);
  doc.text(`Rp. ${calculateTotal()}`, 170, y);

  // Footer
  y += 20;
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  doc.text("Terima kasih telah berbelanja", 105, y, { align: "center" });

  // Simpan PDF
  doc.save("struk-pembelian.pdf");
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50">
      <div className="absolute bottom-0 sm:bottom-auto sm:top-1/2 left-1/2 transform -translate-x-1/2 sm:-translate-y-1/2 bg-white rounded-lg p-5 w-96 sm:w-1/3 max-w-screen-sm max-h-[90vh] overflow-y-auto">
        <img src="./assets/images/icon-order-confirmed.svg" alt="" />
        <h1 className="text-4xl red-hat-text-extrabold text-rose-900 w-1/2 sm:w-full mt-5 mb-3">
          Pesanan Terkonfirmasi
        </h1>
        <p className="text-rose-500 red-hat-text-bold">
          Kami harap Anda menikmati makanannya
        </p>
        <div className="bg-rose-50 p-4 rounded-lg mb-4">
        <h3 className="font-medium text-rose-900 mb-2">Alamat Pengiriman</h3>
        <p className="text-sm text-rose-700">{address}</p>
      </div>
        <div ref={receiptRef}>
          <ul className="rounded-lg bg-rose-50 my-5 overflow-hidden">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b-2 p-5"
              >
                <div className="flex gap-5 items-center justify-between w-full">
                  <div className="flex gap-5 items-center">
                    <div>
                      <img
                        src={item.image.thumbnail}
                        alt=""
                        className="rounded-lg w-16"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-rose-900 red-hat-text-bold mb-1">
                        {item.name}
                      </h3>
                      <div className="flex gap-3">
                        <div className="text-red red-hat-text-bold">
                          {item.quantity}x
                        </div>
                        <div className="red-hat-text-regular text-rose-500 ">
                          @{item.price}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-rose-900 red-hat-text-bold">
                    Rp. {calculateTotalPerItem(item.id)}
                  </div>
                </div>
              </li>
            ))}
            <li className="flex justify-between items-center p-5">
              <p className="red-hat-text-bold text-rose-500">Total Pesanan</p>
              <p className="red-hat-text-extrabold text-3xl text-rose-900">
                Rp. {calculateTotal()}
              </p>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={cetakStruk}
            className="border-red border-2 w-full p-3 rounded-full text-red red-hat-text-bold hover:bg-rose-900 hover:border-rose-900 hover:text-rose-100 transition-colors duration-300"
          >
            Cetak Struk
          </button>
          
          <button
            onClick={handleStartNewOrder}
            className="bg-red w-full p-3 rounded-full text-rose-100 red-hat-text-red-hat-text-red-hat-text-bold hover:bg-rose-900 transition-colors duration-300"
          >
            Buat Pesanan Baru
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmed;