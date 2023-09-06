import "./globals.css";

import localFont from "next/font/local";
import Footer from "./components/Footer";

import Nav from "@/app/components/Nav.js";
import ContextProvider from "./Context";

const helvetica = localFont({
  variable: "--font-helvetica",
  src: [
    {
      path: "../public/fonts/Helvetica-Neue-Regular.woff2",
      weight: "400",
    },
    {
      path: "../public/fonts/Helvetica-Neue-Thin.woff2",
      weight: "100",
    },
    {
      path: "../public/fonts/HelveticaNeue-BlackExt.woff2",
      weight: "700",
    },
  ],
});

export const metadata = {
  title: "Sundown Boulevard",
  description: "Sundown Boulevard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${helvetica.variable} font-helvetica `}>
      <ContextProvider>
        <body className="flex min-h-screen flex-col">
          <Nav></Nav>

          {children}
          <Footer></Footer>
        </body>
      </ContextProvider>
    </html>
  );
}
