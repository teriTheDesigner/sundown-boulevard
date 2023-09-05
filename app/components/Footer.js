"use client";

import logo from "@/public/images/beachpink.png";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="  bg-black  p-4  pb-20 pt-20 text-white">
      <div className="  content-container mx-auto flex items-center justify-between  ">
        <div className="flex flex-col  gap-6">
          <div className="flex ">
            <Link href="/#">
              <Image width="50" height="50" src={logo} alt="logo"></Image>
            </Link>
            <h3 className="pb-4 text-xl ">BREWS & BITES</h3>
          </div>
          <div className="flex flex-col gap-4 text-xs font-thin ">
            <p>Vestergade 34/1</p>
            <p>Copenhagen, 2100</p>
            <p>Phone: +45 42 78 43 06</p>
          </div>
        </div>
        <div className="flex gap-24">
          <div className="flex flex-col gap-4 ">
            <h3>ABOUT</h3>
            <div className="flex flex-col gap-4 text-xs font-thin ">
              <p>OUR STORY</p>
              <p>PEOPLE</p>
              <p>WORK WITH US</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 ">
            <h3>CONTACT</h3>
            <div className="flex flex-col gap-4 text-xs font-thin ">
              <p>Vestergade 34/1</p>
              <p>Copenhagen, 2100</p>
              <p>Phone: +45 42 78 43 06</p>
            </div>
          </div>
        </div>

        {/* <div className="flex gap-12">
          <a
            href="#menu"
            className="text-xs underline-offset-8 hover:underline"
          >
            MENU
          </a>
          <a
            href="#about"
            className=" text-xs underline-offset-8 hover:underline"
          >
            ABOUT US
          </a>
          <a href="#" className="text-xs underline-offset-8 hover:underline">
            NYHEDSBREV
          </a>
          <a href="#" className="text-xs underline-offset-8 hover:underline">
            CONTACT
          </a>
        </div> */}
      </div>
    </footer>
  );
}
