import { useState } from "react";
import axios from "axios";

const QRCodeDisplay = ({ qrData, transactionId }) => {
  const [confirmed, setConfirmed] = useState(false); // Track if payment is confirmed

  const confirmPayment = async () => {
    await axios.post(`${import.meta.env.VITE_BASEURI}/user/confirm-payment`, { transactionId });
    setConfirmed(true);
  };

  return (
    <div>
      {confirmed ? (
        <h3>Payment Confirmed for ₹99! 🎉</h3>
      ) : (
        <>
          <h3>Scan to Pay ₹99</h3>
          <img src={qrData} alt="UPI QR Code" /> {/* Display QR Code */}
          <button onClick={confirmPayment}>I Have Paid</button> {/* Confirm Payment */}
        </>
      )}
    </div>
  );
};

export default QRCodeDisplay;
