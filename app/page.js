"use client";

import Slider from "./components/Slider";
import AOS from "aos";
import "aos/dist/aos.css";

import Link from "next/link";
import Image from "next/image";
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
    console.log("finding order");
  }

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    console.log("updating order ", previousCustomer);
    {
      previousCustomer ? updateCustomer() : null;
    }
  }, [previousCustomer]);

  function updateCustomer() {
    dispatch({
      type: "UPDATE_CUSTOMER",
      payload: previousCustomer,
    });
  }

  return (
    <main className=" content-container mx-auto flex flex-col gap-28">
      <section className="h- grid grid-cols-7 gap-4 ">
        {modalVisible && (
          <div className="modal-overlay">
            <div className="modal w-1/2  ">
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
            <Slider></Slider>
            <Link href="/booking">
              <button className="   mt-4 h-12  w-44 rounded-lg border-2 border-white text-sm">
                BOOK A TABLE
              </button>
            </Link>
          </div>
        </section>
      </section>
      <section
        data-aos="fade-up"
        data-aos-duration="700"
        className="bg-dark-purple flex flex-col  place-items-center bg-opacity-10 "
      >
        <div className=" m-32 flex w-3/4 flex-col place-items-center justify-evenly gap-10 justify-self-center border-2  p-20">
          <h4>FIND YOUR ORDER HERE</h4>

          <div className=" flex items-end gap-4">
            <label className=" flex flex-col gap-2  text-sm">
              Your email
              <input
                onChange={getEmail}
                className="text-dark-purple h-8 w-60 rounded-lg p-2 font-thin"
                type="email"
                placeholder="your@email.com"
              ></input>
            </label>
            <button
              onClick={findOrder}
              className="  h-8 w-32 rounded-lg  border-2 text-sm  "
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
        <h1 className="text-dark-red mb-8 text-4xl opacity-30">MENU</h1>
        <div className="helvetica-thin grid grid-cols-2 border-t ">
          <p className="col-start-1 col-end-2 p-4">Lunch</p>
          <p className=" col-start-2 col-end-3 border-l border-r p-4 ">
            {" "}
            From 16-19
          </p>
          <p className="col-start-3 col-end-4 cursor-pointer  p-4 hover:scale-150">
            →
          </p>
        </div>
        <div className="helvetica-thin grid grid-cols-2 border-t ">
          <p className="col-start-1 col-end-2 p-4">Dinner</p>
          <p className="col-start-2 col-end-3 border-l border-r p-4 ">
            {" "}
            From 19-22:30
          </p>
          <p className="col-start-3 col-end-4 cursor-pointer p-4 hover:scale-150">
            →
          </p>
        </div>
        <div className="helvetica-thin grid grid-cols-2 border-b border-t">
          <p className="col-start-1 col-end-2 p-4">Drinks</p>
          <p className=" col-start-2 col-end-3 border-l border-r p-4 ">
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
          width={100}
          height={100}
          src="/images/gaby-yerden-lDyreMNIo5A-unsplash.jpg"
          alt="gaby-yerden-lDyreMNIo5A-unsplash.jpg"
        ></Image>
        <div className="flex flex-col gap-4 border-l pl-4">
          <h2 className="text-dark-purple text-5xl opacity-20">ABOUT US</h2>
          <p className="helvetica-thin text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          <p className="helvetica-thin text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fug
          </p>
        </div>
      </section>
      <section></section>
    </main>
  );
}
