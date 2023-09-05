"use client";

import Slider from "./components/Slider";

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
  function findOrder() {
    setModalVisible(true);
    setPreviousCustomer(JSON.parse(localStorage.getItem(email)));
    console.log("finding order");
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

  function updateCustomer() {
    dispatch({
      type: "UPDATE_CUSTOMER",
      payload: previousCustomer,
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
  return (
    <main className=" content-container mx-auto flex flex-col gap-28 text-dark-purple">
      <section className="h- grid grid-cols-7 gap-4 ">
        {modalVisible && (
          <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="  flex  w-1/2 bg-white   text-dark-purple shadow-md">
              {previousCustomer ? (
                <div className=" flex w-2/3 flex-col  gap-4  p-20  ">
                  <h1 className="text-xl">YOUR ORDER</h1>
                  <div className="flex flex-col gap-2 border-b border-dark-purple pb-4">
                    <p className="text-sm">Date:</p>
                    <p className=" text-xs">{previousCustomer.date.date}</p>
                  </div>
                  <div className="flex flex-col gap-2 border-b border-dark-purple pb-4">
                    <p className="text-sm">Time:</p>
                    <p className="text-xs">{previousCustomer.date.time}</p>
                  </div>
                  <div className="flex flex-col gap-2 border-b border-dark-purple pb-4">
                    <p className="text-sm">Guests:</p>
                    <p className="text-xs"> {previousCustomer.people}</p>
                  </div>
                  <div className="flex flex-col gap-2 border-b border-dark-purple pb-4">
                    <p className="text-sm">Meal: </p>
                    <p className="text-xs">{previousCustomer.meal}</p>
                  </div>
                  <div className="flex flex-col gap-2  pb-6">
                    <p className="text-sm">Drinks: </p>
                    <div className="text-xs">
                      {previousCustomer.drinks.map((drink, index) => (
                        <p key={index}>{drink}</p>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-around">
                    <button
                      className="h-8 w-24 rounded-lg border-2 border-gray-300  text-xs text-dark-purple "
                      onClick={hideModal}
                    >
                      CLOSE
                    </button>

                    <Link href="/booking">
                      <button
                        onClick={changeStep}
                        className="h-8 w-28 rounded-lg border-2 border-black  bg-dark-purple text-xs text-white "
                      >
                        UPDATE ORDER
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-6 text-center ">
                  <h1 className="mb-2 text-lg font-bold">Email Not Found</h1>
                  <p className="text-xs">
                    We couldn&apos;t locate your email in our records. Please
                    make sure you have entered the correct email address or
                    consider creating a new reservation.
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
        <section className="col-start-1 col-end-8 grid grid-cols-2 gap-4">
          <h1 className="   col-start-1 col-end-2 mt-24 place-self-center text-9xl opacity-20">
            BREWS <br /> &<br /> BITES
          </h1>
          <div className="col-start-2 col-end-3 flex  flex-col place-items-center ">
            <Image
              width={500}
              height={300}
              src="/images/elevate-snnhGYNqm44-unsplash.jpg"
              alt="beerPic"
            />
            <Link href="/booking">
              <button
                onClick={changeStep}
                className="   mt-12 h-12  w-44 rounded-lg border-2 border-dark-purple text-sm text-dark-purple hover:bg-dark-purple hover:text-background-white"
              >
                BOOK A TABLE
              </button>
            </Link>
          </div>
        </section>
      </section>
      <section
        data-aos="fade-up"
        data-aos-duration="700"
        className=" flex flex-col place-items-center bg-dark-purple  bg-opacity-10  "
      >
        <div className=" m-32 flex w-3/4 flex-col place-items-center justify-evenly gap-10 justify-self-center border-2 border-dark-purple p-20">
          <h4>FIND YOUR ORDER HERE</h4>

          <div className="flex  items-end gap-4">
            <label className=" flex flex-col gap-2  text-sm">
              Your email
              <input
                onBlur={(e) => handleBlur(e.target.value)}
                onFocus={() => handleFocus()}
                onChange={getEmail}
                className="h-12 w-60 rounded-lg p-2 font-thin text-dark-purple  focus:outline-dark-purple/70"
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
      </section>
      <section
        data-aos="fade-up"
        data-aos-duration="700"
        id="menu"
        className=" flex flex-col "
      >
        <h1 className="mb-8 text-4xl text-dark-purple opacity-20">MENU</h1>
        <div className="helvetica-thin grid grid-cols-2 border-t  border-dark-purple ">
          <p className="col-start-1 col-end-2 p-4">Lunch</p>
          <p className=" col-start-2 col-end-3 border-l border-r  border-dark-purple p-4 ">
            {" "}
            From 16-19
          </p>
          <p className="col-start-3 col-end-4 cursor-pointer  p-4 hover:scale-150">
            →
          </p>
        </div>
        <div className="helvetica-thin grid grid-cols-2 border-t  border-dark-purple ">
          <p className="col-start-1 col-end-2 p-4">Dinner</p>
          <p className="col-start-2 col-end-3  border-l border-r border-dark-purple p-4 ">
            {" "}
            From 19-22:30
          </p>
          <p className="col-start-3 col-end-4 cursor-pointer p-4 hover:scale-150">
            →
          </p>
        </div>
        <div className="helvetica-thin grid grid-cols-2 border-b  border-t border-dark-purple">
          <p className="col-start-1 col-end-2 p-4">Drinks</p>
          <p className=" col-start-2 col-end-3 border-l  border-r border-dark-purple p-4 ">
            {" "}
            From 16-23:00
          </p>
          <p className="col-start-3 col-end-4 cursor-pointer p-4 hover:scale-150">
            →
          </p>
        </div>
      </section>
      <section
        data-aos="fade-up"
        data-aos-duration="700"
        className=" flex flex-col  place-items-center gap-20"
      >
        <div className="flex flex-col   place-items-center">
          <h1 className="  top-4/5  absolute text-8xl opacity-20">BROWSE</h1>
          <p className="pt-8 text-xl">THROUGH OUR FAVORITES</p>
        </div>
        <div className="  w-3/4">
          {" "}
          <Slider></Slider>
        </div>
      </section>

      <section
        id="about"
        data-aos="fade-up"
        data-aos-duration="700"
        className=" flex gap-8"
      >
        <Image
          width={500}
          height={100}
          src="/images/fred-moon-0yqa0rMCsYk-unsplash.jpg"
          alt="fred-moon-0yqa0rMCsYk-unsplash.jpg"
        ></Image>
        <div className="flex flex-col gap-4 border-l border-dark-purple pl-4">
          <h2 className="pb-8 text-5xl text-dark-purple opacity-20">
            ABOUT US
          </h2>
          <p className=" opacity-85">
            Welcome to Brews & Bites, where the love for exceptional flavors and
            good times come together.
          </p>

          <p className=" font-thin">
            Nestled in the heart of Copenhagen, our restaurant is a haven for
            those seeking a perfect blend of craft beers, creative cocktails,
            and delectable cuisine. Our team of passionate chefs crafts dishes
            using locally sourced ingredients to create a menu that tantalizes
            the taste buds. Whether you&apos;re looking for a casual evening
            with friends or a memorable date night, Brews & Bites offers a warm
            and inviting ambiance that&apos;s perfect for any occasion. Join us
            in savoring the finest brews and bites, and let the good times flow.
          </p>
        </div>
      </section>
    </main>
  );
}
