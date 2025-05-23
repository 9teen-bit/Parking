import axios from "axios";
import React, { createContext, useContext, useState } from "react";

export const AppContext = createContext({
    addCar: () => Promise.resolve(),
    addService: () => Promise.resolve(),
    addPayment: Promise.resolve()
});

export const AppProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [packages, setPackages] = useState([]);
  const [services, setServices] = useState([]);
  const [payments, setPayments] = useState([]);

  // Car operations
  const addCar = async (car) => {
    try {
      const res = await axios.post("http://192.168.137.1:12345/car");
      if (res.status === 201) {
        return res.data;
      }
    } catch (error) {
      console.log("Error while trying to send car data to backend. ", error);
    }
  };

  // Service operations
  const addService = (service) => {
    setServices([...services, service]);
  };

  const updateService = (recordNumber, updatedService) => {
    setServices(
      services.map((service) =>
        service.RecordNumber === recordNumber ? updatedService : service
      )
    );
  };

  const deleteService = (recordNumber) => {
    setServices(
      services.filter((service) => service.RecordNumber !== recordNumber)
    );
  };

  // Payment operations
  const addPayment = (payment) => {
    setPayments([...payments, payment]);
  };

  const updatePayment = (paymentId, updatedPayment) => {
    setPayments(
      payments.map((payment) =>
        payment.id === paymentId ? updatedPayment : payment
      )
    );
  };

  const deletePayment = (paymentId) => {
    setPayments(payments.filter((payment) => payment.id !== paymentId));
  };

  return (
    <AppContext.Provider
      value={{
        addCar,
        addService,
        addPayment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useCar = () => useContext(AppContext);
