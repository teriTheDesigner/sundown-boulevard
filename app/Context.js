"use client";

import { createContext, useReducer } from "react";

export const Context = createContext();
export const DispatchContext = createContext();

const initialState = {
  customer: {
    step: "",
    previousCustomer: false,
    email: "",
    meal: "",
    mealId: "",
    mealImg: "",
    mealCategory: "",
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
    case "UPDATE_MEAL":
      const meal = action.payload;
      return {
        ...state,
        customer: {
          ...state.customer,
          meal: meal.mealName,
          mealId: meal.mealId,
          mealCategory: meal.mealCategory,
          mealImg: meal.mealImg,
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

    case "CLEAR_BASKET":
      return {
        ...state,
        customer: {
          ...state.customer,
          email: "",
          meal: "",
          mealId: "",
          mealImg: "",
          mealCategory: "",
          drinks: [],
          people: 1,
          date: {
            date: "",
            time: "",
          },
          previousCustomer: false,
        },
      };
    case "CLEAR_MEAL":
      return {
        ...state,
        customer: {
          ...state.customer,
          meal: "",
          mealId: "",
          mealCategory: "",
          mealImg: "",
        },
      };

    case "UPDATE_CUSTOMER":
      const customer = action.payload;
      return {
        ...state,
        customer: {
          ...state.customer,
          email: customer?.email,
          meal: customer?.meal,
          drinks: customer?.drinks,
          people: customer?.people,
          date: customer?.date,
          mealCategory: customer?.mealCategory,
          mealImg: customer?.mealImg,
          mealId: customer?.mealId,
          previousCustomer: true,
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
