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
    const updatingOrderId = localStorage.getItem("updatingOrder");

    const fetchSavedMeals = () => {
      if (!updatingOrderId) {
        return []; //no meals if nor oderid
      }

      const savedOrder = JSON.parse(localStorage.getItem(updatingOrderId));
      if (savedOrder && savedOrder.meals) {
        const uniqueMealIds = new Set();
        return savedOrder.meals.filter((meal) => {
          const notSeenBefore = !uniqueMealIds.has(meal.mealId);
          uniqueMealIds.add(meal.mealId);
          return notSeenBefore;
        });
      }
      return [];
    };

    const savedMeals = fetchSavedMeals();
    const mealsToFetch = 9 - savedMeals.length;
    fetchMeals(mealsToFetch).then((fetchedMeals) => {
      setMealData([...savedMeals, ...fetchedMeals]);
    });
  }, []);

  async function fetchMeals(count) {
    const meals = [];
    for (let i = 0; i < count; i++) {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php",
      );
      const data = await res.json();
      const allMeal = {
        mealName: data.meals[0].strMeal,
        mealId: data.meals[0].idMeal,
        mealCategory: data.meals[0].strCategory,
        mealImg: data.meals[0].strMealThumb,
      };
      meals.push(allMeal);
    }
    return meals;
  }

  const generateNewMeals = async () => {
    const newMeals = await fetchMeals(9);
    setMealData(newMeals);
  };

  const selectMeal = (meal) => {
    dispatch({
      type: "ADD_MEAL",
      payload: {
        mealName: meal.mealName,
        mealId: meal.mealId,
        mealCategory: meal.mealCategory,
        mealImg: meal.mealImg,
      },
    });
  };

  return (
    <div className="content-container mx-auto pb-32 pt-16">
      <Stepper></Stepper>

      <div className="grid grid-cols-12 gap-2 pt-6">
        <div className="col-start-1 col-end-10 grid grid-cols-3 gap-4">
          {mealData.map((meal) => {
            const mealCount = customer.meals.filter(
              (chosenMeal) => chosenMeal.mealId === meal.mealId,
            ).length;
            const isSelected = mealCount > 0;

            return (
              <div
                onClick={() => selectMeal(meal)}
                key={meal.mealId}
                className={`relative flex flex-col items-center gap-4 rounded-lg pb-2 text-center 
        ${
          isSelected
            ? "border-2 border-dark-purple/80"
            : "border-2 border-light-blue"
        }`}
              >
                {isSelected && (
                  <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-dark-purple text-white">
                    {mealCount}
                  </div>
                )}
                <Image
                  width="150"
                  height="150"
                  className="w-full"
                  src={meal.mealImg}
                  alt={meal.mealName}
                />
                <h2>{meal.mealName.toUpperCase()}</h2>
                <p className="text-sm">Category: {meal.mealCategory}</p>
              </div>
            );
          })}
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
          <button
            onClick={generateNewMeals}
            className="h-8 w-24 rounded-lg border-2 border-dark-blue bg-white text-xs text-dark-blue hover:bg-dark-blue hover:text-background-white"
          >
            Generate Meal
          </button>
        </div>
      </div>
    </div>
  );
}
