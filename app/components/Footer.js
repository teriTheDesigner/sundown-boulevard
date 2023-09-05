export default function Footer() {
  return (
    <footer className="mt-32  bg-dark-purple/10 p-4  pb-20 pt-20 text-dark-purple">
      <div className=" mx-auto flex w-2/3 place-items-center  justify-between ">
        <div className="flex flex-col  gap-4">
          <h3 className="pb-4 text-xl ">BREWS & BITES</h3>
          <p className="text-sm">Vestergade 34/1</p>
          <p className="text-sm">Copenhagen, 2100</p>
          <p className="text-sm">Phone: +45 42 78 43 06</p>
        </div>
        <div className="flex gap-12">
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
        </div>
      </div>
    </footer>
  );
}
