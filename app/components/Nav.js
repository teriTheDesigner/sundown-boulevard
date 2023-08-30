import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/beach.png";
export default function Nav() {
  return (
    <header className=" mb-8 flex h-16 items-center justify-around ">
      <Link href="/#">
        <Image width="40" height="40" src={logo} alt="logo"></Image>
      </Link>
      <nav className=" flex gap-8 text-xs ">
        <li className="list-none">
          <a href="#" className="  underline-offset-8 hover:underline">
            RESTAURANTER
          </a>
        </li>
        <li className="list-none">
          <a href="#" className="  underline-offset-8 hover:underline">
            PRODUKTER
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
    </header>
  );
}
