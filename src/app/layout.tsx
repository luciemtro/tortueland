import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Tortue Land",
  description: "Le jeu de baston de Mimizuki 🐢",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-green-50 text-gray-800">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
