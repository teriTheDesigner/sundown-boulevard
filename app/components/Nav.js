"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/beachpink.png";
import { useContext } from "react";
import { DispatchContext } from "../Context";
export default function Nav() {
  const dispatch = useContext(DispatchContext);

  function changeStep() {
    dispatch({
      type: "CHANGE_STEP",
      payload: "meal",
    });
  }
  return (
    <header className="bg-white ">
      <div className="  content-container mx-auto flex h-28 items-center justify-around ">
        <Link href="/#">
          <Image width="50" height="50" src={logo} alt="logo"></Image>
        </Link>
        <nav className="  flex gap-8 text-sm ">
          <li className="list-none">
            <a href="#menu" className=" underline-offset-8 hover:underline">
              MENU
            </a>
          </li>
          <li className="list-none">
            <a href="#about" className="  underline-offset-8 hover:underline">
              ABOUT US
            </a>
          </li>
          <li className="list-none">
            <a href="#" className="underline-offset-8 hover:underline ">
              NYHEDSBREV
            </a>
          </li>
          <li className="list-none">
            <a href="#" className="underline-offset-8 hover:underline">
              KONTAKT
            </a>
          </li>
        </nav>
        <button
          onClick={changeStep}
          className=" h-12 w-36 rounded-lg border-2  border-dark-red bg-dark-red text-sm text-white "
        >
          BOOK
        </button>
      </div>
    </header>
  );
}
