"use client";

import { useContext } from "react";
import { DispatchContext, Context } from "../../Context";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Basket from "@/app/components/Basket";
import Stepper from "@/app/components/Stepper";

export default function Drinks() {
  const [drinks, setDrinks] = useState();
  const dispatch = useContext(DispatchContext);
  const { customer } = useContext(Context);

  useEffect(() => {
    FetchDrinks();
  }, []);

  async function FetchDrinks() {
    const res = await fetch("https://api.punkapi.com/v2/beers");
    const data = await res.json();

    setDrinks(data);
  }

  const addDrinks = (drinkName) => {
    console.log("adding", { drinkName }, "to drinks");
    dispatch({
      type: "ADD_DRINK",
      payload: drinkName,
    });
  };

  return (
    <div className="content-container mx-auto flex flex-col gap-4 ">
      <Stepper></Stepper>

      <div className="flex justify-between">
        <div className="grid grid-cols-3 gap-6">
          {drinks
            ? drinks.map((drink) => (
                <div
                  className=" flex h-60 w-48 cursor-pointer flex-col justify-evenly"
                  onClick={() => addDrinks(drink.name)}
                  key={drink.id}
                >
                  <Image
                    alt={drink.name}
                    width="50"
                    height="50"
                    src={drink.image_url}
                  ></Image>
                  <p className="text-sm">{drink.name}</p>
                  <p className="text-xs">
                    <i>{drink.tagline}</i>
                  </p>
                </div>
              ))
            : null}
        </div>
        <div className=" fixed right-24 flex flex-col gap-4 border-l border-white pl-4 text-sm">
          <h5>Your Order</h5>

          <Basket></Basket>

          <Link href="/booking/date">
            <button
              className={` h-8 w-24 rounded-lg border-2 text-xs ${
                customer.drinks.length
                  ? "border-white  text-white"
                  : "border-gray-500 text-gray-500"
              }`}
              disabled={customer.drinks.length ? false : true}
            >
              NEXT
            </button>
          </Link>
          {customer.drinks.length ? null : (
            <p className="max-w-[60%] text-xs">
              Please choose at least one drink to continue.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
