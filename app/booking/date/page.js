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
            <div className="flex  items-center gap-6">
              <button
                className="h-8 w-6 bg-white text-black"
                type="button"
                onClick={addGuest}
              >
                +
              </button>
              <p>{customer.people}</p>
              <button
                type="button"
                className={`${
                  customer.people <= 1
                    ? " h-8 w-6 bg-gray-500 text-black"
                    : "h-8 w-6 bg-white text-black"
                }`}
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
      <div className=" flex flex-col gap-4 border-l border-white pl-4 text-sm">
        <h5>Your Order</h5>
        {customer.date.date && (
          <div className="flex flex-col gap-2">
            <p className="text-xs">Date:</p>
            <p className="text-xs">{customer.date.date}</p>
          </div>
        )}

        {customer.date.time && (
          <div className="flex flex-col gap-2">
            <p className="text-xs">Time:</p>
            <p className="text-xs">{customer.date.time}</p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <p className="text-xs">Guests:</p>
          <p className="text-xs"> {customer.people}</p>
        </div>
        {customer.meal && (
          <div className="flex flex-col gap-2">
            <p className="text-xs">Meal: </p>
            <p className="text-xs">{customer.meal}</p>
          </div>
        )}

        {customer.drinks.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-xs">Drinks: </p>
            <div className="text-xs">
              {customer.drinks.map((drink, index) => (
                <p key={index}>{drink}</p>
              ))}
            </div>
          </div>
        )}

        <Link href="/booking/receipt">
          <button
            className="h-8 w-24  rounded-lg border-2 border-white text-xs"
            disabled={customer.drinks.length ? false : true}
          >
            ORDER
          </button>
        </Link>
      </div>
    </div>
  );
}
