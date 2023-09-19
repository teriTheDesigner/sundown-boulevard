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
  const [mealData, setMealData] = useState([]);

  function nextStep() {
    dispatch({
      type: "CHANGE_STEP",
      payload: "drinks",
    });
  }

  useEffect(() => {
    /*if (!customer.meal) {
      FetchMeal();
    }*/
    fetchMeals(9);
  }, []);

  async function fetchMeals(count) {
    let meals = [];
    for (let i = 0; i < count; i++) {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const data = await res.json();
      meals.push(data.meals[0]);
    }
    setMealData(meals);
  }

  const selectMeal = (meal) => {
    dispatch({
      type: "ADD_MEAL",
      payload: {
        mealName: meal.strMeal,
        mealId: meal.idMeal,
        mealCategory: meal.strCategory,
        mealImg: meal.strMealThumb
      },
    });
  };

  return (
    <div className="content-container mx-auto pb-32 pt-16">
      <Stepper></Stepper>

      <div className="grid grid-cols-12 gap-2 pt-6">
        <div className="col-start-1 col-end-10 grid grid-cols-3 gap-4">
          {mealData.map(meal => (
            <div key={meal.idMeal} className="flex flex-col items-center gap-4">
              <Image
                width="150"
                height="150"
                className="w-full"
                src={meal.strMealThumb}
                alt={meal.strMeal}
              />
              <h2>{meal.strMeal.toUpperCase()}</h2>
              <p className="text-sm">Category: {meal.strCategory}</p>
              <button
                onClick={() => selectMeal(meal)}
                className="h-8 w-32 rounded-lg border-2 border-dark-blue bg-white text-xs text-dark-blue hover:bg-dark-blue hover:text-background-white"
              >
                SELECT
              </button>
            </div>
          ))}
        </div>

        <div className="top-1/5 sticky col-start-11 col-end-13 flex h-96 flex-col gap-4 border-l border-dark-purple pl-4 text-sm">
          <h5>YOUR ORDER</h5>
          <Basket></Basket>

          <Link href="/booking/drinks">
            <button
              onClick={nextStep}
              className="h-8 w-24 rounded-lg border-2 border-dark-blue bg-white text-xs text-dark-blue hover:bg-dark-blue hover:text-background-white"
            >
              NEXT
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
