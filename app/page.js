"use client";

import Slider from "./components/Slider";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState();

  function getEmail(e) {
    setEmail(e.target.value);
  }
  function findOrder() {
    const previousCustomer = JSON.parse(localStorage.getItem(email));
    console.log(previousCustomer);
  }

  console.log(email);
  return (
    <main className=" mx-auto grid max-w-screen-md grid-cols-7 gap-8">
      <div className=" col-start-1 col-end-8">
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
