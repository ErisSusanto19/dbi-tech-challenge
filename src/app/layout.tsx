import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DBI Tech Challenge | Eris Susanto",
  description: "Submission untuk tech challenge DBI yang mencakup redesign, CRUD, dan integrasi API.",
  icons: {
    icon: "https://dapurbuzzer.co.id/assets/img/faviconblue.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <Navbar/>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
