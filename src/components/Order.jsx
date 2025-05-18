/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from "react";

const Order = ({ cartItems, onPaymentSuccess, onCancel, address, setAddress }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  // Menghitung total harga
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Proses pembayaran
  const handlePay = () => {
    if (!address.trim()) {
    alert("Mohon masukkan alamat pengiriman.");
    return;
  }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50">
      <div className="absolute bottom-0 sm:bottom-auto sm:top-1/2 left-1/2 transform -translate-x-1/2 sm:-translate-y-1/2 bg-white rounded-lg p-5 w-full max-w-md">
        <h1 className="text-2xl font-bold text-rose-900 mb-4">Pembayaran</h1>
        
        {/* Ringkasan Order */}
        <div className="bg-rose-50 rounded-lg p-4 mb-5">
          <h2 className="font-bold text-rose-900 mb-2">Ringkasan Order</h2>
          <textarea
          name="address"
          id="address"
          className="h-32 border-2 rounded-lg w-full p-2 block"
          placeholder="masukkan alamat pengiriman.."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
/>

          <div className="max-h-32 overflow-y-auto mb-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between py-1">
                <span>{item.quantity}x {item.name}</span>
                <span>Rp. {item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-2 border-t border-rose-200">
            <span className="font-bold">Total</span>
            <span className="text-xl font-bold text-rose-900">Rp. {total}</span>
          </div>
        </div>
        
        {/* Tab Metode Pembayaran */}
        <div className="flex gap-2 mb-4">
          
            <button
              type="button"
              className='flex-1 py-2 px-3 rounded-lg border border-rose-500 bg-rose-50'
              onClick={() => setPaymentMethod()}
            >
              <div className="flex items-center justify-center gap-2">
                 
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 10V17M12 10V17M20 10V17M2 17H22M4 21H20M12 3L22 9H2L12 3Z" />
                  </svg>
                <span>Transfer Bank</span>
              </div>
            </button>
        
        </div>
        
     
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h3 className="font-medium text-blue-800 mb-2">Instruksi Transfer</h3>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Bank:</span> BCA</p>
              <p><span className="font-medium">No. Rekening:</span> 1234567890</p>
              <p><span className="font-medium">Atas Nama:</span> PT Makanan Lezat</p>
              <p><span className="font-medium">Jumlah:</span> Rp. {total}</p>
            </div>
          </div>
        
        {/* Tombol aksi */}
        <div className="flex gap-3 mt-6">
          <button 
            onClick={onCancel}
            className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-full p-3 w-full text-center mt-5 hover:bg-gray-200 transition-colors duration-300"
          >
            Batal
          </button>
          
          <button
            onClick={handlePay}
            disabled={isProcessing}
            className="flex-1 py-2 px-4 bg-red text-rose-100 rounded-full p-3 w-full text-center mt-5 hover:bg-rose-900 transition-colors duration-300"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </span>
            ) : (
              `Bayar Rp. ${total}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;