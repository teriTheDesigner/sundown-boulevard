"use client";

import { createContext, useReducer } from "react";

export const Context = createContext();
export const DispatchContext = createContext();

const initialState = {
  customer: {
    name: "",
    step: "",
    previousCustomer: false,
    email: "",
    meals: [],
    drinks: [],
    people: 1,
    date: {
      date: "",
      time: "",
    },
  },
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MEAL":
      const newMeal = {
        mealName: action.payload.mealName,
        mealId: action.payload.mealId,
        mealCategory: action.payload.mealCategory,
        mealImg: action.payload.mealImg,
      };
      return {
        ...state,
        customer: {
          ...state.customer,
          meals: [...state.customer.meals, newMeal],
        },
      };

    case "REMOVE_MEAL":
      const mealIdToRemove = action.payload.mealId;
      const mealIndex = state.customer.meals.findIndex(
        (meal) => meal.mealId === mealIdToRemove,
      );
      if (mealIndex === -1) return state; // If meal is not found, return the current state.

      const updatedMeals = [...state.customer.meals];
      updatedMeals.splice(mealIndex, 1); // Remove only one instance of the meal.

      return {
        ...state,
        customer: {
          ...state.customer,
          meals: updatedMeals,
        },
      };

    case "CHANGE_STEP":
      return {
        ...state,
        customer: {
          ...state.customer,
          step: action.payload,
        },
      };

    case "ADD_DRINK":
      return {
        ...state,
        customer: {
          ...state.customer,
          drinks: [...state.customer.drinks, action.payload],
        },
      };

    case "REMOVE_DRINK":
      const index = action.payload;
      const updatedDrinks = [...state.customer.drinks];
      updatedDrinks.splice(index, 1);
      return {
        ...state,
        customer: {
          ...state.customer,
          drinks: updatedDrinks,
        },
      };

    case "UPDATE_DATE":
      const { date, time } = action.payload;
      return {
        ...state,
        customer: {
          ...state.customer,
          date: {
            date: date,
            time: time,
          },
        },
      };

    case "ADD_GUEST":
      return {
        ...state,
        customer: {
          ...state.customer,
          people: state.customer.people + 1,
        },
      };

    case "REMOVE_GUEST":
      return {
        ...state,
        customer: {
          ...state.customer,
          people: state.customer.people - 1,
        },
      };

    case "ADD_EMAIL":
      return {
        ...state,
        customer: {
          ...state.customer,
          email: action.payload,
        },
      };

    case "ADD_NAME":
      return {
        ...state,
        customer: {
          ...state.customer,
          name: action.payload,
        },
      };

    case "CLEAR_BASKET":
      return initialState;

    case "UPDATE_CUSTOMER":
      const customer = action.payload;
      return {
        ...state,
        customer: {
          ...state.customer,
          email: customer?.email,
          meals: customer?.meals,
          drinks: customer?.drinks,
          people: customer?.people,
          date: customer?.date,
          previousCustomer: true,
          name: customer?.name,
        },
      };

    default:
      return state;
  }
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  return (
    <Context.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </Context.Provider>
  );
};
export default ContextProvider;
