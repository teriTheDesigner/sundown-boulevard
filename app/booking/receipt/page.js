"use client";
import { useContext } from "react";
import { Context, DispatchContext } from "../../Context";

import Link from "next/link";

export default function Receipt() {
  const { customer } = useContext(Context);
  const dispatch = useContext(DispatchContext);

  function clearBasket() {
    dispatch({
      type: "CLEAR_BASKET",
    });
  }
  return (
    <div className="content-container mx-auto flex items-center justify-center pb-20  pt-8">
      <div className=" flex  w-1/2 flex-col gap-4 border-l border-dark-purple  p-8 text-dark-purple">
        <h1 className="text-xl">YOUR BOOKING IS COMPLETE!</h1>

        <p className="text-xs">
          Thank you for your order <i>{customer.name}</i> ,we are looking
          forward to your visit!
        </p>
        <p className="text-xs">
          We sent an email confirmation to this address: <i>{customer.email}</i>
        </p>

        <p>Order Details:</p>
        <div className="flex flex-col gap-2">
          <p className="text-xs">Date:</p>
          <p className="text-xs">{customer.date.date}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs">Time:</p>
          <p className="text-xs">{customer.date.time}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs">Guests:</p>
          <p className="text-xs"> {customer.people}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs">Meal: </p>
          <p className="text-xs">{customer.meal}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs">Drinks: </p>
          <div className="text-xs">
            {customer.drinks.map((drink, index) => (
              <p key={index}>{drink}</p>
            ))}
          </div>
        </div>

        <Link href="/">
          <button
            className="h-8 w-24  rounded-lg border-2 border-dark-purple  text-xs  text-dark-purple hover:bg-dark-purple hover:text-background-white"
            onClick={clearBasket}
          >
            HOME
          </button>
        </Link>
      </div>
    </div>
  );
}
