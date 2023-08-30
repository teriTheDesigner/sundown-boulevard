"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useContext } from "react";
import { Context, DispatchContext } from "@/app/Context";
import Link from "next/link";
import Basket from "../components/Basket";

function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 25 + Math.floor(Math.random() * 50);
  const lightness = 70 + Math.floor(Math.random() * 10);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export default function Booking() {
  const [meal, setMeal] = useState();
  const dispatch = useContext(DispatchContext);
  const { customer } = useContext(Context);
  const [backgroundColor, setBackgroundColor] = useState(
    getRandomPastelColor(),
  );

  const changeBackgroundColor = () => {
    const randomColor = getRandomPastelColor();
    setBackgroundColor(randomColor);
  };
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
    changeBackgroundColor();
  }

  return (
    <div
      className={`content-container bg-${backgroundColor} mx-auto flex flex-col justify-around gap-6`}
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
          {meal ? (
            <>
              <h2>{meal.mealName} </h2>
              <p className="text-sm">Category: {meal.category}</p>

              <Image
                width="150"
                height="150"
                className="w-3/4"
                src={meal.mealImg}
                alt="mealImg"
              ></Image>
            </>
          ) : null}

          <div className="flex gap-4 ">
            <button
              onClick={FetchMeal}
              className="h-8 w-32  place-self-end rounded-lg border-2 border-white text-xs"
            >
              NEW MEAL
            </button>
            <button
              onClick={() => addMeal(meal.mealName)}
              className="h-8 w-32  place-self-end rounded-lg border-2 border-white text-xs"
            >
              CHOOSE MEAL
            </button>
          </div>
        </div>

        <div className="fixed right-24 flex flex-col gap-4 border-l border-white pl-4 text-sm">
          <h5>Your Order</h5>
          <Basket></Basket>

          <Link href="/booking/drinks">
            <button className="h-8 w-24  rounded-lg border-2 border-white text-xs">
              Continue
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
