import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/beachpink.png";
export default function Nav() {
  return (
    <header className=" mb-8 flex h-16 items-center justify-around">
      <Link href="/#">
        <Image width="40" height="40" src={logo} alt="logo"></Image>
      </Link>
      <nav className="flex gap-8">
        <li className="list-none">
          <a href="#" className="underline-offset-8 hover:underline">
            Restauranter
          </a>
        </li>
        <li className="list-none">
          <a href="#" className="underline-offset-8 hover:underline">
            Produkter
          </a>
        </li>
        <li className="list-none">
          <a href="#" className="underline-offset-8 hover:underline">
            Nyhedsbrev
          </a>
        </li>
        <li className="list-none">
          <a href="#" className="underline-offset-8 hover:underline">
            Kontakt
          </a>
        </li>
      </nav>
    </header>
  );
}
