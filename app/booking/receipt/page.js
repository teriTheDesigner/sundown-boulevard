"use client";
import { useContext } from "react";
import { Context } from "../Context";

import Link from "next/link";

export default function Receipt() {
  const { customer } = useContext(Context);
  return (
    <div className="content-container  mx-auto">
      <div className="  flex w-1/3 flex-col gap-4 bg-white  p-4 text-black">
        <h3>We are looking forward to your visit!</h3>
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
          <button>HOME</button>
        </Link>
      </div>
    </div>
  );
}
