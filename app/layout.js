import "./globals.css";
import { Inter } from "next/font/google";

import Nav from "@/app/components/Nav.js";
import ContextProvider from "./Context";

const interFont = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Sundown Boulevard",
  description: "Sundown Boulevard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={interFont.variable}>
      <ContextProvider>
        <body className="">
          <Nav></Nav>

          {children}
        </body>
      </ContextProvider>
    </html>
  );
}
