"use client";
import TextSubmission from "../components/TextSubmission";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function WritePage() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!text.trim() || !author.trim()) {
      setMessage("Merci de remplir tous les champs 🧐");
      return;
    }

    const { error } = await supabase.from("quotes").insert({
      text,
      author,
    });

    if (error) {
      console.error("Erreur d'insertion dans Supabase : ", error.message); // Ajout de .message

      setMessage("Oups ! Une erreur s’est produite ❌");
    } else {
      console.log("Citation insérée avec succès");

      setMessage("Citation enregistrée avec succès 🎉");
      setText("");
      setAuthor("");
      window.location.reload();
    }
  };

  return (
    <div className="bg-[url('/images/tortueland.jpeg')] bg-cover bg-no-repeat bg-center min-h-screen flex flex-col items-center p-8 w-screen bg-fixed">
      <TextSubmission />
      <div
        className="p-8 rounded-xl shadow-xl w-full mt-8 overflow-auto"
        style={{
          background: "rgba(255, 255, 255, 0.5)", // Fond semi-transparent (blanc avec 80% d'opacité)
          maxHeight: "80vh", // Limite la hauteur maximale du formulaire
        }}
      >
        <textarea
          placeholder="Texte"
          className="w-full p-4 mb-4 border bg-white border-green-300 rounded-lg text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Auteur"
          className="w-full p-4 mb-4 border bg-white border-green-300 rounded-lg text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="group text-white px-6 py-2 w-full rounded shadow transition cursor-pointer uppercase font-extrabold tracking-widest bg-emerald-400 hover:bg-green-400 hover:animate-[colorFlash_0.8s_linear_infinite]"
        >
          Envoyer !
        </button>

        {message && (
          <p className="mt-4 text-center text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
}
