import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import NavbarComponent from "./navbar/page";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Setsu - URL SHORTENER",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        {<NavbarComponent />}
        <main>{children}</main>
      </body>
    </html>
  );
}
