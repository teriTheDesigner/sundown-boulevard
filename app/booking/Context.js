"use client";

import { createContext, useReducer } from "react";

export const Context = createContext();
export const DispatchContext = createContext();

const initialState = {
  customer: {
    email: "",
    meal: "",
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
      return {
        ...state,
        customer: {
          ...state.customer,
          meal: action.payload,
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
