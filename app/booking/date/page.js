"use client";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Context, DispatchContext } from "../../Context";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import Basket from "@/app/components/Basket";
import Stepper from "@/app/components/Stepper";

export default function Date() {
  const { customer } = useContext(Context);
  const dispatch = useContext(DispatchContext);
  const [error, setError] = useState();

  useEffect(() => {
    const inputElement = document.getElementById("dateTimeInput");

    if (inputElement) {
      const flatpickrOptions = {
        locale: {
          firstDayOfWeek: 1,
        },

        minDate: "today",
        enableTime: true,
        minTime: "16:00",
        maxTime: "22:30",
        time_24hr: true,
        disable: [
          function (date) {
            return date.getDay() === 0 || date.getDay() === 6;
          },
        ],

        onChange: (selectedDates, dateStr, instance) => {
          const [date, time] = dateStr.split(" ");
          console.log("Full date:", dateStr);
          console.log("Selected date", date);
          console.log("selected time", time);

          dispatch({
            type: "UPDATE_DATE",
            payload: { date, time },
          });
        },
      };
      if (customer.date.date) {
        flatpickrOptions.defaultDate =
          customer.date.date + " " + customer.date.time;
      }

      flatpickr(inputElement, flatpickrOptions);
    }
  }, []);

  const addGuest = () => {
    dispatch({
      type: "ADD_GUEST",
    });
  };

  const removeGuest = () => {
    dispatch({
      type: "REMOVE_GUEST",
    });
  };

  const addEmail = (e) => {
    dispatch({
      type: "ADD_EMAIL",
      payload: e.target.value,
    });
  };
  function storeData() {
    console.log(customer);
    localStorage.setItem(customer.email, JSON.stringify(customer));
  }

  const handleBlur = (value) => {
    console.log("handle blur");
    if (value.trim() === "") {
      setError("Email is required.");
    } else if (!value.includes("@")) {
      setError("Please enter a valid email.");
    } else {
      setError("");
    }
  };

  const handleFocus = () => {
    console.log("handle focus");
    setError("");
  };

  return (
    <div className="content-container mx-auto ">
      <Stepper></Stepper>
      <div className="flex justify-between">
        {" "}
        <form className="flex gap-20">
          <div className="flex flex-col gap-20">
            <div className="flex flex-col gap-6">
              <p>Number of guests</p>
              <div className="flex  items-center gap-6">
                <button
                  type="button"
                  className={`${
                    customer.people <= 1
                      ? " bg-light-gray text-black  h-8 w-6"
                      : "bg-white   text-black h-8 w-6 "
                  }`}
                  onClick={removeGuest}
                  disabled={customer.people <= 1 ? true : false}
                >
                  -
                </button>{" "}
                <p>{customer.people}</p>
                <button
                  disabled={customer.people >= 10 ? true : false}
                  className={`${
                    customer.people >= 10
                      ? " bg-gray-500 text-black h-8 w-6"
                      : "bg-white text-black h-8 w-6"
                  }`}
                  type="button"
                  onClick={addGuest}
                >
                  +
                </button>
              </div>
            </div>
            {customer.previousCustomer ? null : (
              <div>
                <label className=" flex flex-col gap-2 text-sm">
                  Your email
                  <input
                    className="  text-black h-12 w-64 rounded-lg p-2"
                    type="email"
                    placeholder="your@email.com"
                    onChange={addEmail}
                    onBlur={(e) => handleBlur(e.target.value)}
                    onFocus={() => handleFocus()}
                  ></input>
                  {error && (
                    <span className="text-dark-red opacity-80">{error}</span>
                  )}
                </label>
              </div>
            )}
          </div>
          <label className="flex flex-col  gap-8">
            Pick a date and time for your booking:
            <input
              id="dateTimeInput"
              className=" text-black h-12 w-64 rounded-lg p-2 text-sm"
              name="booking"
              placeholder="YYYY-MM-DD"
            />
          </label>
        </form>
        <div className=" border-white fixed right-24 flex flex-col gap-4 border-l pl-4 text-sm">
          <h5>Your Order</h5>
          <div className="flex flex-col gap-2  ">
            <p className="text-xs">Guests:</p>
            <p className="text-xs"> {customer.people}</p>
          </div>
          <Basket></Basket>

          <Link href="/booking/receipt">
            <button
              onClick={storeData}
              className="border-white h-8  w-28 rounded-lg border-2 text-xs"
              disabled={customer.drinks.length ? false : true}
            >
              {customer.previousCustomer ? "UPDATE ORDER" : "ORDER"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
