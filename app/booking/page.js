"use client";
import { useState, useEffect } from "react";
import Stepper from "../components/Stepper";
import Image from "next/image";
import { useContext } from "react";
import { Context, DispatchContext } from "@/app/Context";
import Link from "next/link";
import Basket from "../components/Basket";

export default function Booking() {
  const dispatch = useContext(DispatchContext);
  const { customer } = useContext(Context);

  function nextStep() {
    dispatch({
      type: "CHANGE_STEP",
      payload: "drinks",
    });
  }

  useEffect(() => {
    if (!customer.meal) {
      FetchMeal();
    }
  }, []);

  async function FetchMeal() {
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php",
    );
    const data = await res.json();
    const mealName = data.meals[0].strMeal;
    const mealId = data.meals[0].idMeal;
    const mealImg = data.meals[0].strMealThumb;
    const mealCategory = data.meals[0].strCategory;

    console.log("adding", mealName, "to Meals");
    dispatch({
      type: "UPDATE_MEAL",
      payload: { mealName, mealId, mealCategory, mealImg },
    });
  }

  console.log(customer.meal);
  return (
    <div className=" content-container mx-auto pb-32 pt-16 ">
      <Stepper></Stepper>

      <div className="grid grid-cols-12 gap-2  pt-6  ">
        <div className="col-start-1 col-end-9 flex gap-16 ">
          <div>
            <Image
              width="150"
              height="150"
              className="w-full"
              src={customer.mealImg}
              alt="mealImg"
            />
            <div className="flex flex-col  gap-4">
              <h2>{customer.meal.toUpperCase()}</h2>
              <p className="text-sm">Category: {customer.mealCategory}</p>
              <button
                onClick={FetchMeal}
                className="h-8 w-32 rounded-lg border-2  border-dark-blue bg-white  text-xs text-dark-blue hover:bg-dark-blue hover:text-background-white"
              >
                NEW MEAL
              </button>
            </div>
          </div>
        </div>

        <div className="top-1/5 sticky col-start-11 col-end-13 flex h-96 flex-col gap-4  border-l border-dark-purple pl-4 text-sm">
          <h5>YOUR ORDER</h5>
          <Basket></Basket>

          <Link href="/booking/drinks">
            <button
              onClick={nextStep}
              className="h-8 w-24 rounded-lg  border-2  border-dark-blue bg-white  text-xs text-dark-blue hover:bg-dark-blue hover:text-background-white"
            >
              NEXT
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
