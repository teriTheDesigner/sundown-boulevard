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

  function changeStep(value) {
    dispatch({
      type: "CHANGE_STEP",
      payload: value,
    });
  }

  return (
    <div className=" content-container mx-auto  pb-32 pt-16 ">
      <Stepper></Stepper>

      <div className=" grid grid-cols-12 gap-2 pt-6">
        <div className="col-start-1 col-end-10 grid grid-cols-3 gap-2">
          {drinks
            ? drinks.map((drink) => {
                const isSelected = customer.drinks.includes(drink.name);

                return (
                  <div
                    className={` flex h-80 w-60 cursor-pointer flex-col place-items-center justify-between  rounded-lg bg-white p-4 ${
                      isSelected
                        ? "border-2 border-dark-purple/80"
                        : "border-2 border-light-blue"
                    }`}
                    onClick={() => addDrinks(drink.name)}
                    key={drink.id}
                  >
                    <Image
                      alt={drink.name}
                      className="m-auto"
                      width="50"
                      height="50"
                      src={drink.image_url}
                    ></Image>
                    <div className="flex h-20 flex-col gap-4 border-t border-dark-purple">
                      <p className="pt-2 text-sm">{drink.name}</p>
                      <p className="text-xs">
                        <i>{drink.tagline}</i>
                      </p>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
        <div className="top-1/5 sticky col-start-11 col-end-13 flex h-96 flex-col gap-4  border-l border-dark-purple pl-4 text-sm">
          <h5>YOUR ORDER</h5>

          <Basket></Basket>

          <Link href="/booking/date">
            <button
              className={` h-8 w-24 rounded-lg border-2 text-xs  ${
                customer.drinks.length
                  ? "border-dark-blue  text-dark-blue  hover:bg-dark-blue hover:text-background-white"
                  : "border-light-gray text-light-gray"
              }`}
              onClick={() => changeStep("date")}
              disabled={customer.drinks.length ? false : true}
            >
              NEXT
            </button>
          </Link>
          {customer.drinks.length ? null : (
            <p className=" text-xs text-light-gray">
              Please choose a drink to continue.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
