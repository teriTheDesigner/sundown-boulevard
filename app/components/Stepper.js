"use client";
import Link from "next/link";
import { Context, DispatchContext } from "@/app/Context";
import { useContext } from "react";

export default function Stepper() {
  const { customer } = useContext(Context);
  const dispatch = useContext(DispatchContext);

  function changeStep(value) {
    dispatch({
      type: "CHANGE_STEP",
      payload: value,
    });
  }

  return (
    <div>
      <div className=" mb-8 flex w-1/2  justify-between text-xs ">
        <Link href="/booking">
          <button
            onClick={() => changeStep("meal")}
            disabled={customer.step === "meal"}
          >
            1. Meal
          </button>
        </Link>
        <Link href="/booking/drinks">
          <button
            onClick={() => changeStep("drinks")}
            disabled={customer.step === "meal" || customer.step === "drinks"}
            className={`${
              customer.step === "meal" ? "text-light-gray" : "text-dark-purple"
            }`}
          >
            2. Drinks
          </button>
        </Link>
        <Link href="/booking/date">
          <button
            onClick={() => changeStep("date")}
            className={`${
              customer.step === "meal" || customer.step === "drinks"
                ? "text-light-gray"
                : "text-dark-purple"
            }`}
            disabled={customer.step === "meal" || customer.step === "drinks"}
          >
            3. Date
          </button>
        </Link>
      </div>
    </div>
  );
}
