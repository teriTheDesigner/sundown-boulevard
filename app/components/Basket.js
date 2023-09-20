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

  const separateMeals = () => {
    const mealCount = {};
  
    customer.meals.forEach((meal) => {
      mealCount[meal.mealName] = (mealCount[meal.mealName] || 0) + 1;
    });
  
    return Object.keys(mealCount).map((mealName) => ({
      name: mealName,
      count: mealCount[mealName],
    }));
  };

  
  const removeMeal = (mealName) => {
    const mealToRemove = customer.meals.find(meal => meal.mealName === mealName);
    
    if (mealToRemove) {
      dispatch({
        type: "REMOVE_MEAL",
        payload: { mealId: mealToRemove.mealId },
      });
      console.log("Removing one instance of meal", mealName);
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

      {customer.meals && customer.meals.length > 0 && (
        <div className="flex flex-col gap-2  border-t border-dark-purple pt-1 ">
          <p className="text-xs">Meals: </p>
          <div className="text-xs">
            {separateMeals().map((mealObj) => (
              <div key={mealObj.name} className="flex gap-2">
                <button onClick={() => removeMeal(mealObj.name)}>X</button>
                <p>{mealObj.name} ({mealObj.count})</p>
              </div>
            ))}
          </div>
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
