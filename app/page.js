"use client";

import Slider from "./components/Slider";
import RotatingImage from "./components/RotatingImage";

import AOS from "aos";
import "aos/dist/aos.css";

import Link from "next/link";
import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import { DispatchContext } from "@/app/Context";

export default function Home() {
  const [email, setEmail] = useState();
  const [previousCustomer, setPreviousCustomer] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useContext(DispatchContext);
  const [error, setError] = useState();

  function hideModal() {
    setModalVisible(false);
  }

  function getEmail(e) {
    setEmail(e.target.value);
  }


  // Order for email
  function findOrder() {
    setModalVisible(true);

    // Matched customers Array
    const matchedCustomers = [];

    // Iterate over all keys in localStorage.
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const customer = JSON.parse(localStorage.getItem(key));

      // Check if input email matches the provided email
      if (customer && customer.email === email) {
        matchedCustomers.push({
          ...customer,
          id: key, // added the ID (which is the key in localStorage) to the customer object
        });
      }
    }

    setPreviousCustomer(matchedCustomers);
    console.log("finding order");
  }

  function handleUpdateOrder(customer) {
    // Saving the order id to local storage to the key updatingOrder
    localStorage.setItem('updatingOrder', customer.id);
    
    updateCustomer(customer);
    dispatch({
      type: "CHANGE_STEP",
      payload: "meal",
    });
}


  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    console.log("updating order ", previousCustomer);
    if (previousCustomer) {
      updateCustomer();
    }
  }, [previousCustomer]);

  function updateCustomer(customer) {
    dispatch({
      type: "UPDATE_CUSTOMER",
      payload: customer,
    });
  }

  const handleBlur = (value) => {
    console.log("handle blur");
    if (value.trim() === "") {
      setError("");
    } else if (!value.includes("@")) {
      setError("Please enter a valid email.");
    }
  };

  const handleFocus = () => {
    console.log("handle focus");
    setError("");
  };

  function changeStep() {
    dispatch({
      type: "CHANGE_STEP",
      payload: "meal",
    });
  }

  function removeUpdatingOrder() {
    localStorage.removeItem('updatingOrder');
  }
  
  return (
    <main className="  flex flex-col ">
      {modalVisible && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="flex w-1/2 bg-white text-dark-purple shadow-md">
            {previousCustomer && previousCustomer.length ? (
              <div className="flex w-2/3 flex-col gap-4 p-20">
                <h1 className="text-xl">YOUR ORDERS</h1>
                {previousCustomer.map((customer) => (
                  <div key={customer.id}>
                    <div className="flex flex-col gap-2 border-b border-dark-purple pb-4">
                      <p className="text-sm">Email:</p>
                      <p className="text-xs">{customer.email}</p>
                      <p className="text-sm">ID:</p>
                      <p className="text-xs">#{customer.id}</p>
                      <p className="text-sm">Meals in this order:</p>
                    <ul>
                      {customer.meals.map((meal) => (
                        <li key={meal.mealId} className="text-xs">
                          {meal.mealName}
                        </li>
                      ))}
                    </ul>
                    </div>
                    <Link href="/booking">
                      <button
                        onClick={() => handleUpdateOrder(customer)}
                        className="h-8 w-28 rounded-lg border-2 border-black bg-dark-purple text-xs text-white "
                      >
                        UPDATE ORDER
                      </button>
                    </Link>
                  </div>
                ))}
                <button
                  className="h-8 w-24 rounded-lg border-2 border-gray-300 text-xs text-dark-purple"
                  onClick={hideModal}
                >
                  CLOSE
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-6 p-20 text-center">
                <h1 className="mb-2 text-lg">EMAIL NOT FOUND</h1>
                <p className="text-xs">
                  We couldn&apos;t locate your email in our records. Please make
                  sure you have entered the correct email address or consider
                  creating a new reservation.
                </p>
                <button
                  className="h-8 w-24 rounded-lg border-2 border-gray-300 text-xs text-black"
                  onClick={hideModal}
                >
                  CLOSE
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <section className="  bg-black  pb-32 pt-32 text-white ">
        <div className="  content-container mx-auto grid grid-cols-12 gap-2 ">
          <div className="col-start-1 col-end-5 flex  flex-col justify-between ">
            <h1 className=" text-9xl opacity-60">BREWS</h1>
            <div className="flex flex-col ">
              <p className="  opacity-60">
                Welcome to Brews & Bites, where the love for exceptional flavors
                and good times come together.
              </p>

              <Link href="/booking">
                <button
                  onClick={() => {
                    dispatch({ type: "CLEAR_BASKET" })
                    changeStep();
                    removeUpdatingOrder();
                  }}
                  className="mt-12 h-12 w-44  rounded-lg border-2 border-dark-red bg-dark-red text-sm text-white hover:bg-dark-red hover:text-background-white"
                >
                  BOOK A TABLE
                </button>
              </Link>
            </div>
          </div>
          <h1 className="col-start-6 col-end-8  place-self-center text-9xl opacity-60">
            &
          </h1>
          <div className="col-start-8 col-end-13  flex flex-col  items-end justify-between gap-8">
            <Image
              width={500}
              height={300}
              src="/images/elevate-snnhGYNqm44-unsplash.jpg"
              alt="beerPic"
            />
            <h1 className=" text-9xl opacity-60">BITES</h1>
          </div>
        </div>
      </section>
      <section
        data-aos=" fade-up"
        data-aos-duration="700"
        className=" pb-32 pt-32"
      >
        <div className=" content-container mx-auto grid grid-cols-12 gap-4 ">
          <div className="col-start-1 col-end-7 flex flex-col place-items-center justify-evenly rounded-xl border-2 border-black p-4 ">
            <h2 className="text-4xl opacity-80 ">FIND YOUR ORDER </h2>
            <div className="flex items-end gap-4 ">
              <label className=" flex flex-col gap-2  text-sm">
                Your email
                <input
                  onBlur={(e) => handleBlur(e.target.value)}
                  onFocus={() => handleFocus()}
                  onChange={getEmail}
                  className="h-12 w-60 rounded-lg border-2 border-dark-purple p-2 font-thin text-dark-purple  focus:outline-dark-purple/70"
                  type="email"
                  placeholder="your@email.com"
                ></input>
                {error && (
                  <span className="text-dark-red opacity-80">{error}</span>
                )}
              </label>
              <button
                onClick={findOrder}
                className="  h-12 w-32 rounded-lg  border-2  border-dark-purple text-sm hover:bg-dark-purple hover:text-background-white "
              >
                FIND ORDER
              </button>
            </div>
          </div>
          <div className="col-start-9 col-end-13">
            <RotatingImage></RotatingImage>
          </div>
        </div>
      </section>

      <section
        data-aos="fade-up"
        data-aos-duration="700"
        id="menu"
        className=" bg-black pb-32 pt-32"
      >
        <div className=" content-container mx-auto grid grid-cols-12 gap-2">
          <div className="col-start-1 col-end-13 text-white">
            <h1 className="mb-16 text-4xl  opacity-70">MENU</h1>
            <div className="grid grid-cols-2 border-t border-white  font-thin ">
              <p className="col-start-1 col-end-2 p-4">Lunch</p>
              <p className=" col-start-2 col-end-3 border-l border-r  border-white p-4 ">
                {" "}
                From 16-19
              </p>
              <p className="col-start-3 col-end-4 cursor-pointer  p-4 hover:scale-150">
                →
              </p>
            </div>
            <div className="grid grid-cols-2 border-t border-white  font-thin ">
              <p className="col-start-1 col-end-2 p-4">Dinner</p>
              <p className="e col-start-2  col-end-3 border-l border-r border-white p-4 ">
                {" "}
                From 19-22:30
              </p>
              <p className="col-start-3 col-end-4 cursor-pointer p-4 hover:scale-150">
                →
              </p>
            </div>
            <div className="grid grid-cols-2 border-b border-t  border-white font-thin">
              <p className="col-start-1 col-end-2 p-4">Drinks</p>
              <p className=" col-start-2 col-end-3 border-l  border-r border-white p-4 ">
                {" "}
                From 16-23:00
              </p>
              <p className="col-start-3 col-end-4 cursor-pointer p-4 hover:scale-150">
                →
              </p>
            </div>
          </div>
        </div>
      </section>
      <section data-aos="fade-up" data-aos-duration="700" className="  pt-32 ">
        <div className=" content-container mx-auto grid grid-cols-12 place-items-center gap-2">
          {" "}
          <div className="col-start-1 col-end-13 flex flex-col   place-items-center">
            <h1 className="  top-4/5  absolute text-8xl opacity-20">BROWSE</h1>
            <p className="pt-8 text-xl">THROUGH OUR FAVORITES</p>
          </div>
          <div className=" col-start-1 col-end-13 mt-20 w-1/2 ">
            <Slider></Slider>
          </div>
        </div>
      </section>
      <section
        id="about"
        data-aos="fade-up"
        data-aos-duration="700"
        className="  pb-32 pt-32"
      >
        <div className=" content-container mx-auto grid grid-cols-12 place-items-center gap-2">
          <Image
            className="col-start-1 col-end-6"
            width={500}
            height={200}
            src="/images/fred-moon-0yqa0rMCsYk-unsplash.jpg"
            alt="fred-moon-0yqa0rMCsYk-unsplash.jpg"
          ></Image>
          <div className="col-start-7 col-end-13 flex flex-col gap-4 border-l border-dark-purple pl-4">
            <h2 className="pb-8 text-5xl  opacity-80">ABOUT US</h2>
            <p className=" opacity-85">
              Welcome to Brews & Bites, where the love for exceptional flavors
              and good times come together.
            </p>

            <p className=" font-thin">
              Nestled in the heart of Copenhagen, our restaurant is a haven for
              those seeking a perfect blend of craft beers, creative cocktails,
              and delectable cuisine. Our team of passionate chefs crafts dishes
              using locally sourced ingredients to create a menu that tantalizes
              the taste buds. Whether you&apos;re looking for a casual evening
              with friends or a memorable date night, Brews & Bites offers a
              warm and inviting ambiance that&apos;s perfect for any occasion.
              Join us in savoring the finest brews and bites, and let the good
              times flow.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
