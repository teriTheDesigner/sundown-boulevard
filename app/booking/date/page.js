"use client";

import { Context, DispatchContext } from "../Context";
import { useContext } from "react";
import Link from "next/link";

export default function Date() {
  const { customer } = useContext(Context);
  const dispatch = useContext(DispatchContext);

  const changeDate = (e) => {
    const selectedDate = e.target.value;
    const date = selectedDate.split("T")[0];
    const time = selectedDate.split("T")[1];
    console.log("Full date:", selectedDate);
    console.log("Selected date", date);
    console.log("selected time", time);

    dispatch({
      type: "UPDATE_DATE",
      payload: { date, time },
    });
  };

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

  return (
    <div className="content-container mx-auto flex justify-between">
      <form className="flex gap-20">
        <div className="flex flex-col gap-20">
          <div className="flex flex-col gap-6">
            <p>Number of guests</p>
            <div className="flex  gap-6">
              <button type="button" onClick={addGuest}>
                +
              </button>
              <p>{customer.people}</p>
              <button
                type="button"
                onClick={removeGuest}
                disabled={customer.people <= 1 ? true : false}
              >
                -
              </button>
            </div>
          </div>
          <div>
            <label className=" flex flex-col gap-2 text-sm">
              Your email
              <input
                className="  h-8 w-60 rounded-lg p-2 text-black"
                type="email"
                placeholder="your@email.com"
              ></input>
            </label>
          </div>
        </div>
        <label className="flex flex-col  gap-8">
          Pick a date and time for your booking:
          <input
            className=" h-8 w-60 rounded-lg p-2 text-black"
            type="datetime-local"
            name="booking"
            min="2023-08-31T09:30"
            max="2024-09-22T16:45"
            onChange={changeDate}
          />
        </label>
      </form>
      <div className="flex flex-col gap-4 text-sm">
        <h5>Your Order</h5>
        <p className="text-xs">Date:</p>
        <p>{customer.date.date}</p>
        <p className="text-xs">Time:</p>
        <p>{customer.date.time}</p>

        <p className="text-xs">Meal: </p>
        <p className="text-xs">{customer.meal}</p>
        <p className="text-xs">Drinks: </p>
        <div className="text-xs">
          {customer.drinks.map((drink, index) => (
            <p key={index}>{drink}</p>
          ))}
        </div>

        <Link href="/booking/date">
          <button className="h-8 w-24  rounded-lg border-2 border-white text-xs">
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
}
