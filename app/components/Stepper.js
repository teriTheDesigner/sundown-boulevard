"use client";
import Link from "next/link";
import { useState } from "react";

export default function Stepper() {
  return (
    <div>
      <div className="mb-8 flex w-1/2 justify-between  text-xs text-gray-300 ">
        <Link href="/booking">
          <p>1. Meal</p>
        </Link>
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
