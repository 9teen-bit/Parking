import axios from "axios";
import React, { useState, useEffect } from "react";

const PaymentForm = () => {
  const [payment, setPayment] = useState({
    platenumber: "",
    amountpaid: "",
    paymentdate: new Date().toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await axios.post(
        "http://localhost:12345/api/payments/create",
        payment
      );
    } catch (error) {
      console.log("Error while trying to add payment. ", error);
    } finally {
        setLoading(false)
    }
  };


  return (
    <div>
      <h3 className="text-lg font-medium mb-4 text-gray-700">
        Add Payment
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="RecordNumber"
          >
            Plate Number
          </label>
          <input
            type="text"
            id="platenumber"
            name="platenumber"
            value={payment.platenumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="AmountPaid"
          >
            Amount Paid
          </label>
          <input
            type="number"
            id="amountpaid"
            name="amountpaid"
            value={payment.amountpaid}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="PaymentDate"
          >
            Payment Date
          </label>
          <input
            type="date"
            id="paymentdate"
            name="paymentdate"
            value={payment.paymentdate}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Processing..." : "Process payment"}
            
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
