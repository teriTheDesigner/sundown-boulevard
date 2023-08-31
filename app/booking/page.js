"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useContext } from "react";
import { Context, DispatchContext } from "@/app/Context";
import Link from "next/link";
import Basket from "../components/Basket";

export default function Booking() {
  const [meal, setMeal] = useState();
  const dispatch = useContext(DispatchContext);
  const { customer } = useContext(Context);

  const addMeal = (mealName, mealId, mealCategory, mealImg) => {
    console.log("adding", mealName, mealId, mealCategory, mealImg, "to Meals");
    dispatch({
      type: "UPDATE_MEAL",
      payload: { mealName, mealId, mealCategory, mealImg },
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
    const mealId = data.meals[0].idMeal;
    const mealImg = data.meals[0].strMealThumb;
    const category = data.meals[0].strCategory;

    setMeal({ mealName, mealImg, category, mealId });
  }

  function changeMeal() {
    if (customer.meal) {
      dispatch({
        type: "CLEAR_MEAL",
      });
      FetchMeal();
    } else {
      FetchMeal();
    }
  }

  return (
    <div
      className={`content-container mx-auto flex flex-col justify-around gap-6`}
    >
      <div className="mb-8 flex w-1/2 justify-between text-xs text-gray-300 ">
        <Link href="/booking">
          <p>1. Meal</p>
        </Link>

        <Link href="/booking/drinks">
          <p>2. Drinks</p>
        </Link>
        <Link href="/booking/date">
          <p>3. Date</p>
        </Link>
      </div>

      <div className="flex justify-between">
        <div className="flex w-1/3 flex-col items-center gap-4 ">
          {customer.meal ? (
            <>
              <h2>{customer.meal}</h2>
              <p className="text-sm">Category: {customer.mealCategory}</p>
              <Image
                width="150"
                height="150"
                className="w-full"
                src={customer.mealImg}
                alt="mealImg"
              />
            </>
          ) : meal ? (
            <>
              <h2>{meal.mealName}</h2>
              <p className="text-sm">Category: {meal.category}</p>
              <Image
                width="150"
                height="150"
                className="w-full"
                src={meal.mealImg}
                alt="mealImg"
              />
            </>
          ) : null}

          <button
            onClick={changeMeal}
            className="h-8 w-32  place-self-end rounded-lg border-2 border-white text-xs"
          >
            NEW MEAL
          </button>
        </div>

        <div className="fixed right-24 flex flex-col gap-4 border-l border-white pl-4 text-sm">
          <h5>Your Order</h5>
          <Basket></Basket>

          <Link href="/booking/drinks">
            <button
              onClick={() =>
                addMeal(meal.mealName, meal.mealId, meal.category, meal.mealImg)
              }
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
