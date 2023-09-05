import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/beach.png";
export default function Nav() {
  return (
    <header className=" mb-20  flex h-28 items-center justify-around bg-dark-purple/10 ">
      <Link href="/#">
        <Image width="40" height="40" src={logo} alt="logo"></Image>
      </Link>
      <nav className=" flex gap-8 text-sm ">
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
    </header>
  );
}
