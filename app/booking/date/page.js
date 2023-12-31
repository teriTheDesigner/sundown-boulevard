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
  const [emailError, setEmailError] = useState();
  const [nameError, setNameError] = useState();

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

  const addName = (e) => {
    dispatch({
      type: "ADD_NAME",
      payload: e.target.value,
    });
  };

  function storeData() {
    localStorage.setItem(customer.email, JSON.stringify(customer));
  }

  const handleEmailBlur = (value) => {
    if (value.trim() === "") {
      setEmailError("Email is required.");
    } else if (!value.includes("@")) {
      setEmailError("Please enter a valid email.");
    } else {
      setEmailError("");
    }
  };

  const handleEmailFocus = () => {
    setEmailError("");
  };

  const handleNameBlur = (value) => {
    if (value.trim() === "") {
      setNameError("Name is required.");
    } else {
      setNameError("");
    }
  };

  const handleNameFocus = () => {
    setNameError("");
  };

  return (
    <div className="content-container mx-auto pb-32 pt-16">
      <Stepper></Stepper>
      <div className="grid grid-cols-12 gap-2 pt-6">
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
                      ? " h-8 w-6  bg-gray-300 text-black"
                      : "h-8   w-6 border-2 border-dark-purple/20 bg-white text-black "
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
                      ? " h-8 w-6 bg-gray-300 text-black"
                      : "h-8 w-6 border-2 border-dark-purple/20 bg-white text-black"
                  }`}
                  type="button"
                  onClick={addGuest}
                >
                  +
                </button>
              </div>
            </div>
            {customer.previousCustomer ? null : (
              <div className="flex flex-col gap-4">
                <label className=" flex flex-col gap-2 text-sm">
                  Your Name
                  <input
                    onBlur={(e) => handleNameBlur(e.target.value)}
                    onFocus={() => handleNameFocus()}
                    onChange={addName}
                    placeholder="John Smith"
                    type="name"
                    className=" h-12 w-64 rounded-lg border-2 border-dark-purple/50 p-2 font-thin text-dark-purple focus:outline-dark-purple/70"
                  ></input>
                  {nameError && (
                    <span className="text-xs text-dark-red opacity-80">
                      {nameError}
                    </span>
                  )}
                </label>
                <label className=" flex flex-col gap-2 text-sm">
                  Your Email
                  <input
                    className=" h-12 w-64 rounded-lg border-2 border-dark-purple/50 p-2 font-thin text-dark-purple focus:outline-dark-purple/70"
                    type="email"
                    placeholder="your@email.com"
                    onChange={addEmail}
                    onBlur={(e) => handleEmailBlur(e.target.value)}
                    onFocus={() => handleEmailFocus()}
                  ></input>
                  {emailError && (
                    <span className="text-xs text-dark-red opacity-80">
                      {emailError}
                    </span>
                  )}
                </label>
              </div>
            )}
          </div>
          <label className="flex flex-col  gap-8">
            Pick a date and time for your booking:
            <input
              id="dateTimeInput"
              className="h-12 w-64 rounded-lg border-2 border-dark-purple/50 p-2 text-sm font-thin  text-dark-purple  focus:outline-dark-purple/70"
              name="booking"
              placeholder="YYYY-MM-DD"
            />
          </label>
        </form>
        <div className="top-1/5 sticky col-start-11 col-end-13 flex h-96 flex-col gap-4  border-l border-dark-purple pl-4 text-sm">
          <h5>YOUR ORDER</h5>
          <div className="flex flex-col gap-2  ">
            <p className="text-xs">Guests:</p>
            <p className="text-xs"> {customer.people}</p>
          </div>
          <Basket></Basket>

          <Link href="/booking/receipt">
            <button
              onClick={storeData}
              className={`h-8 w-32  rounded-lg border-2 ${
                customer.name && customer.email && customer.date
                  ? "border-dark-blue  text-dark-blue  hover:bg-dark-blue hover:text-background-white"
                  : "border-light-gray text-light-gray"
              }`}
              disabled={
                customer.name && customer.email && customer.date.date
                  ? false
                  : true
              }
            >
              {customer.previousCustomer ? "UPDATE ORDER" : "ORDER"}
            </button>
          </Link>
          {customer.name && customer.email && customer.date.date ? null : (
            <p className=" text-xs text-light-gray">
              Please fill all the information to continue.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
