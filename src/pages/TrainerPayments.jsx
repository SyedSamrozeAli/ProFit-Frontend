import React, { lazy, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import NavBar from "../components/NavBar";
import TrainerPaymentTable from "../components/Trainers/TrainerPaymentTable";

function TrainerPayments() {
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentData, setPaymentData] = useState([]);

  const token = localStorage.getItem("token");

  const handleDateChange = (e) => {
    setPaymentDate(e.target.value);
  };

  const [year, month] = paymentDate.split("-");
  const monthInt = parseInt(month, 10);
  const yearInt = parseInt(year, 10);

  //getting the data of the trainer payments
  useEffect(() => {
    if (!paymentDate) {
      toast.error("Please choose a date!");
      return;
    }

    axios
      .get(
        `http://profit-backend.test/api/trainer-payment?month=${monthInt}&year=${yearInt}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.success === false) {
          setPaymentData([]);
        } else {
          setPaymentData(response.data.data);
          toast.success("Data retrieved successfully");
          console.log(response.data.data);
        }
      })
      .catch((error) => {
        toast.error(error.data.data.message);
      });
  }, [paymentDate]);

  return (
    <>
      <NavBar title="Trainer Payment" />
      <div className="w-full bg-white">
        <div className="mx-6 my-4">
          <div className="flex justify-between items-center mb-5">
            <input
              type="month"
              value={paymentDate}
              onChange={handleDateChange}
              className="border px-4 py-2 rounded-lg"
            />
          </div>
          <TrainerPaymentTable
            paymentData={paymentData}
            month={monthInt}
            year={yearInt}
          />
        </div>
      </div>
    </>
  );
}

export default TrainerPayments;
