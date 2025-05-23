import React, { useState } from 'react';
import PaymentForm from '../components/PaymentForm';
import PaymentList from '../components/PaymentList';
import Navbar from '../components/Navbar';

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [editingPayment, setEditingPayment] = useState(null);

  const addPayment = (payment) => {
    if (editingPayment) {
      setPayments(payments.map(p => p.PaymentNumber === editingPayment.PaymentNumber ? payment : p));
      setEditingPayment(null);
    } else {
      setPayments([...payments, { ...payment, PaymentNumber: Date.now().toString() }]);
    }
  };

  const deletePayment = (paymentNumber) => {
    setPayments(payments.filter(payment => payment.PaymentNumber !== paymentNumber));
  };

  return (
    <div>
      <Navbar />
      <h2 className="text-2xl w-screen font-semibold mb-6 text-gray-800">Payment Management</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <PaymentForm 
            addPayment={addPayment} 
            editingPayment={editingPayment} 
            setEditingPayment={setEditingPayment} 
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <PaymentList 
            payments={payments} 
            deletePayment={deletePayment} 
            setEditingPayment={setEditingPayment} 
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;