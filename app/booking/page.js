"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useContext } from "react";
import { DispatchContext } from "@/app/booking/Context";
import Link from "next/link";

export default function Booking() {
  const [meal, setMeal] = useState();
  const dispatch = useContext(DispatchContext);

  const addMeal = (mealName) => {
    console.log("adding", mealName, "to Meals");
    dispatch({
      type: "UPDATE_MEAL",

      payload: mealName,
    });
  };

  useEffect(() => {
    FetchMeal();
  }, []);

  async function FetchMeal() {
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php",
    );
    const data = await res.json();
    const mealName = data.meals[0].strMeal;
    const mealImg = data.meals[0].strMealThumb;
    const category = data.meals[0].strCategory;

    setMeal({ mealName, mealImg, category });
  }

  return (
    <div className="content-container  mx-auto flex flex-col  justify-around gap-6  ">
      <div className="mb-8 flex w-1/2 justify-between text-xs text-gray-300 ">
        <Link href="/booking">
          <p>Meal</p>
        </Link>
        <Link href="/booking/drinks">
          <p>Drinks</p>
        </Link>
        <Link href="/booking/date">
          <p>Date</p>
        </Link>
      </div>

      <div className="flex justify-between">
        <div className="flex w-1/3 flex-col gap-4 ">
          {meal ? (
            <>
              <h2>{meal.mealName} </h2>
              <p className="text-sm">Category: {meal.category}</p>

              <Image
                width="200"
                height="200"
                className="w-full"
                src={meal.mealImg}
                alt="mealImg"
              ></Image>
            </>
          ) : null}

          <button
            onClick={FetchMeal}
            className="h-8 w-32  place-self-end rounded-lg border-2 border-white text-sm"
          >
            New Meal
          </button>
        </div>

        <div className="flex flex-col gap-4 text-sm">
          <h5>Your Order</h5>

          <p className="text-xs">Meal: </p>
          {meal ? <p className="text-xs">{meal.mealName}</p> : null}

          <Link href="/booking/drinks">
            <button
              onClick={() => addMeal(meal.mealName)}
              className="h-8 w-24  rounded-lg border-2 border-white text-xs"
            >
              Continue
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
