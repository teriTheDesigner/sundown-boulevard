"use client";

import Slider from "./components/Slider";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { Context, DispatchContext } from "@/app/Context";

export default function Home() {
  const [email, setEmail] = useState();
  const [previousCustomer, setPreviousCustomer] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const { customer } = useContext(Context);
  const dispatch = useContext(DispatchContext);

  function hideModal() {
    setModalVisible(false);
  }

  function getEmail(e) {
    setEmail(e.target.value);
  }
  function findOrder() {
    setModalVisible(true);
    setPreviousCustomer(JSON.parse(localStorage.getItem(email)));
  }

  useEffect(() => {
    {
      previousCustomer ? updateCustomer() : null;
    }
  }, []);

  function updateCustomer() {
    dispatch({
      type: "UPDATE_CUSTOMER",
      payload: previousCustomer,
    });
  }

  return (
    <main className=" mx-auto grid max-w-screen-md grid-cols-7 gap-8">
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal w-1/2 ">
            {previousCustomer ? (
              <div className=" flex flex-col gap-4">
                <h1>
                  <b>Your Order</b>
                </h1>
                <div className="flex flex-col gap-2">
                  <p className="text-xs">Date:</p>
                  <p className="text-xs">{previousCustomer.date.date}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs">Time:</p>
                  <p className="text-xs">{previousCustomer.date.time}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs">Guests:</p>
                  <p className="text-xs"> {previousCustomer.people}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs">Meal: </p>
                  <p className="text-xs">{previousCustomer.meal}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs">Drinks: </p>
                  <div className="text-xs">
                    {previousCustomer.drinks.map((drink, index) => (
                      <p key={index}>{drink}</p>
                    ))}
                  </div>
                </div>
                <div className="flex justify-around">
                  <button
                    className="h-8 w-24 rounded-lg border-2 border-gray-300  text-xs text-black "
                    onClick={hideModal}
                  >
                    CLOSE
                  </button>

                  <Link href="/booking">
                    <button className="h-8 w-28 rounded-lg border-2 border-black  bg-black text-xs text-white ">
                      UPDATE ORDER
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-6 text-center ">
                <h1 className="mb-2 text-lg font-bold">Email Not Found</h1>
                <p className="text-xs">
                  We couldn&apos;t locate your email in our records. Please make
                  sure you have entered the correct email address or consider
                  creating a new reservation.
                </p>
                <button
                  className=" h-8 w-24 rounded-lg border-2 border-gray-300  text-xs text-black "
                  onClick={hideModal}
                >
                  CLOSE
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className=" col-start-1 col-end-5">
        <Slider></Slider>
      </div>

      <div className=" col-start-6 col-end-8 flex h-36 flex-col justify-between border-2 border-white p-5 ">
        <h4>Place your order here</h4>

        <Link href="/booking">
          <button className=" h-8 w-28  rounded-lg border-2 border-white text-sm">
            ORDER
          </button>
        </Link>
      </div>
      <div className=" col-start-1 col-end-4 flex h-64 flex-col justify-evenly border-2 border-white p-5 ">
        <h4>Find your order</h4>
        <label className=" flex flex-col gap-2 text-sm">
          Your email
          <input
            onChange={getEmail}
            className="h-8 w-60 rounded-lg text-black"
            type="email"
            placeholder="your@email.com"
          ></input>
        </label>
        <button
          onClick={findOrder}
          className=" h-8 w-32  rounded-lg border-2 border-white text-sm"
        >
          FIND ORDER
        </button>
      </div>
      <div className=" col-start-4 col-end-8 border-2 border-white">
        Content box
      </div>
    </main>
  );
}
