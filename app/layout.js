import "./globals.css";
// import { Inter } from "next/font/google";

import Nav from "@/app/components/Nav.js";
import ContextProvider from "./Context";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sundown Boulevard",
  description: "Sundown Boulevard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ContextProvider>
        <body className="helvetica-regular">
          <Nav></Nav>

          {children}
        </body>
      </ContextProvider>
    </html>
  );
}
