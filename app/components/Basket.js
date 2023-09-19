"use client";

import { useContext } from "react";
import { Context, DispatchContext } from "../Context";

export default function Basket() {
  const { customer } = useContext(Context);
  const dispatch = useContext(DispatchContext);

  const separateDrinks = () => {
    const drinkCount = {};

    customer.drinks.forEach((drink) => {
      drinkCount[drink] = (drinkCount[drink] || 0) + 1;
    });

    return Object.keys(drinkCount).map((drinkName) => ({
      name: drinkName,
      count: drinkCount[drinkName],
    }));
  };

  const removeDrink = (drinkName) => {
    const index = customer.drinks.indexOf(drinkName);

    if (index !== -1) {
      dispatch({
        type: "REMOVE_DRINK",
        payload: index,
      });
      console.log("Removing drink", drinkName);
    }
  };

  return (
    <div className="flex w-40 flex-col gap-4">
      {customer.date.date && (
        <div className="flex flex-col gap-2  border-t border-dark-purple pt-1">
          <p className="text-xs">Date:</p>
          <p className="text-xs">{customer.date.date}</p>
        </div>
      )}

      {customer.date.time && (
        <div className="flex flex-col gap-2  border-t border-dark-purple pt-1 ">
          <p className="text-xs">Time:</p>
          <p className="text-xs">{customer.date.time}</p>
        </div>
      )}

      {customer.meal && (
        <div className="flex flex-col gap-2  border-t border-dark-purple pt-1 ">
          <p className="text-xs">Meal: </p>
          <p className="text-xs">{customer.meal}</p>
        </div>
      )}

      {customer.drinks.length > 0 && (
        <div className="flex flex-col gap-2 border-t  border-dark-purple pt-1 ">
          <p className="text-xs">Drinks: </p>
          <div className="text-xs">
            {separateDrinks().map((drinkObj) => (
              <div key={drinkObj.name} className="flex gap-2">
                <button onClick={() => removeDrink(drinkObj.name)}>X</button>
                <p>{drinkObj.name} ({drinkObj.count})</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
