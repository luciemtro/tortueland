"use client";
import { useState, useEffect } from "react";

export default function TextSubmission() {
  interface Text {
    text: string;
    author: string;
    created_at: string;
  }

  const [texts, setTexts] = useState<Text[]>([]);

  // Récupère les textes enregistrés
  useEffect(() => {
    const fetchTexts = async () => {
      const res = await fetch("/api/get-texts");
      const data = await res.json();
      if (res.ok) {
        setTexts(data); // Met à jour la liste des textes
      }
    };

    fetchTexts();
  }, []);

  return (
    <div className="w-full mt-8">
      {/* Titre avec shadow plus marqué */}
      <h2
        className="text-3xl font-extrabold text-green-200 tracking-wider text-center mb-6 uppercase"
        style={{
          textShadow:
            "4px 4px 10px rgba(0, 100, 0, 0.8), -4px -4px 10px rgba(0, 100, 0, 0.8)",
        }}
      >
        Courrier des disciples tortues
      </h2>

      {/* Affichage des textes */}
      {texts.map((text, index) => (
        <div
          key={index}
          className="mb-4 p-4 w-full  rounded-lg shadow-sm"
          style={{
            background: "rgba(255, 255, 255, 0.5)", // Fond semi-transparent (blanc avec 80% d'opacité)
          }}
        >
          <p className="text-lg text-gray-600">
            {'" '}
            {text.text}
            {' "'}
          </p>
          <p className="text-sm text-gray-800 mt-2 bold uppercase">
            - {text.author}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            {new Date(text.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
