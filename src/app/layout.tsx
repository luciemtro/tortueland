import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Head from "next/head"; // Correct import for head elements

// 🐢 Imports Google Fonts via next/font
import { Lilita_One, Fredoka } from "next/font/google";

// 🟢 Configuration
const lilita = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lilita",
});

const fredoka = Fredoka({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "Tortue Land",
  description: "Bienvenue sur tortueLand🐢",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${lilita.variable} ${fredoka.variable}`}>
      <Head>
        {/* Configuration du viewport pour désactiver le zoom */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        {/* Autres balises meta ou liens */}
      </Head>
      <body className="bg-green-50 text-gray-800 font-sans">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
