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

    case "UPDATE_DRINKS":
      return {
        ...state,
        customer: {
          ...state.customer,
          drinks: [...state.customer.drinks, action.payload],
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
