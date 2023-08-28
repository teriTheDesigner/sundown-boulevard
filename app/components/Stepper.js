"use client";
import Link from "next/link";
import { useState } from "react";

export default function Stepper() {
  const [modalVisible, setModalVisible] = useState(false);

  function showModal() {
    setModalVisible(true);
  }
  function hideModal() {
    setModalVisible(false);
  }
  return (
    <div>
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal flex w-1/2 flex-col gap-8">
            <h1>
              <b>Are you sure you want to change your meal?</b>
            </h1>
            <p className="text-xs">
              By choosing to continue, your current meal selection will be
              replaced with a new meal. Please make sure you are certain about
              this decision before proceeding.
            </p>
            <div className="flex justify-around">
              <button
                className="h-8 w-24 rounded-lg border-2 border-gray-300  text-xs text-black "
                onClick={hideModal}
              >
                CLOSE
              </button>

              <Link href="/booking">
                <button className="h-8 w-28 rounded-lg border-2 border-black  bg-black text-xs text-white ">
                  CHANGE MEAL
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="mb-8 flex w-1/2 justify-between  text-xs text-gray-300 ">
        <button onClick={showModal}>
          <p>1. Meal</p>
        </button>
        <Link href="/booking/drinks">
          <p>2. Drinks</p>
        </Link>
        <Link href="/booking/date">
          <p>3. Date</p>
        </Link>
      </div>
    </div>
  );
}
