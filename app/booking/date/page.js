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
  const [dateSelected, setDateSelected] = useState(false);
  const TIME_SLOTS = ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"];


  useEffect(() => {
    const inputElement = document.getElementById("dateTimeInput");

    if (inputElement) {
      const flatpickrOptions = {
        locale: {
          firstDayOfWeek: 1,
        },

        minDate: "today",
        enableTime: false,
        minTime: "16:00",
        maxTime: "22:30",
        time_24hr: true,
        disable: [
          function (date) {
            return date.getDay() === 0 || date.getDay() === 6;
          },
        ],

        onChange: (selectedDates, dateStr) => {
          console.log("Selected date:", dateStr);
          setDateSelected(true);  // set to true once a date is picked
          dispatch({
              type: "UPDATE_DATE",
              payload: { date: dateStr, time: customer.date.time },
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

 /* function storeData() {
    localStorage.setItem(customer.email, JSON.stringify(customer));
  }*/

  function getNextId() {
    // Fetch the last used ID from localStorage
    const lastId = parseInt(localStorage.getItem("lastId") || "0", 10);
  
    return lastId + 1;
  }
  
  function storeData() {
    let id;
  
    // Check if there's an updatingOrder in localStorage
    const updatingOrderId = localStorage.getItem('updatingOrder');
  
    // If there's an updatingOrderId and it's valid, use it
    if (updatingOrderId && localStorage.getItem(updatingOrderId)) {
      id = updatingOrderId;
      localStorage.removeItem('updatingOrder'); // remove it after using so it doesn't affect future orders
    } else {
      // Else, use the next auto-incremented ID
      id = getNextId();
      // Store this ID back to localStorage for the future
      localStorage.setItem("lastId", id.toString());
    }
    
    // Save the order data with the ID in localstorage
    localStorage.setItem(id.toString(), JSON.stringify({...customer, email: customer.email}));
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

  function handleTimeSlotClick(selectedTime) {
    dispatch({
        type: "UPDATE_DATE",
        payload: {
            ...customer.date,
            time: selectedTime
        },
    });
}

function isTimeSlotTaken(date, time) {
  // Convert localStorage data to array of objects
  const allStoredData = Object.keys(localStorage).map(key => JSON.parse(localStorage.getItem(key)));

  // .some() method to check if stored data matches
  return allStoredData.some(savedData => savedData?.date?.date === date && savedData?.date?.time === time);
}

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

          {dateSelected && (
            <div>
              <p>Select a time:</p>
              <ul>
                {TIME_SLOTS.map((slot, idx) => (
                  <li key={idx} className="
                  text-center">
                    <button 
                      className={`time-slot ${isTimeSlotTaken(customer.date.date, slot) ? "bg-red-500 px-2 py-1 cursor-not-allowed rounded-full" : "hover:rounded-full px-2 py-1 hover:bg-blue-500"}`}
                      onClick={() => handleTimeSlotClick(slot)}
                      disabled={isTimeSlotTaken(customer.date.date, slot)}
                    >
                      {slot}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}



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
