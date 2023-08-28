"use client";

import { useContext } from "react";
import { DispatchContext, Context } from "../Context";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Basket from "@/app/components/Basket";

export default function Drinks() {
  const [drinks, setDrinks] = useState();
  const dispatch = useContext(DispatchContext);

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
    <div className="content-container mx-auto flex flex-col ">
      <div className="mb-8 flex w-1/2 justify-between  text-xs text-gray-300 ">
        <Link href="/booking">
          <p>Meal</p>
        </Link>
        <Link href="/booking/drinks">
          <p className="text-sm text-white">Drinks</p>
        </Link>
        <Link href="/booking/date">
          <p>Date</p>
        </Link>
      </div>
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
        <div className="flex flex-col gap-4 text-sm">
          <h5>Your Order</h5>

          {/* <p className="text-xs">Meal: </p>
          <p className="text-xs">{customer.meal}</p>
          <p className="text-xs">Drinks: </p>
          <div className="text-xs">
            {customer.drinks.map((drink, index) => (
              <p key={index}>{drink}</p>
            ))}
          </div> */}
          <Basket></Basket>

          <Link href="/booking/date">
            <button className="h-8 w-24  rounded-lg border-2 border-white text-xs">
              Continue
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
