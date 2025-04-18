"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMimizukiSounds } from "../../hooks/useMimizukiSounds";

const IMAGE_COUNT = 8;
const HIT_THRESHOLDS = [0, 10, 25, 45, 70, 100, 135, 175];

export default function Game() {
  const [started, setStarted] = useState(false);
  const [hits, setHits] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [pseudo, setPseudo] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  useMimizukiSounds(hits);

  const handleStart = () => {
    setHits(0);
    setStartTime(Date.now());
    setEndTime(null);
    setImageIndex(0);
    setStarted(true);
    setSubmitted(false);
    setPseudo("");
  };

  const handleHit = () => {
    if (!started || endTime) return;

    const newHits = hits + 1;
    setHits(newHits);

    const nextIndex = HIT_THRESHOLDS.findIndex((thresh) => newHits < thresh);
    const index = nextIndex === -1 ? IMAGE_COUNT - 1 : nextIndex - 1;
    setImageIndex(index);

    if (index === IMAGE_COUNT - 1) {
      setEndTime(Date.now());
    }
  };

  const handleSubmit = async () => {
    if (!pseudo || !endTime || !startTime) return;

    const score = (endTime - startTime) / 1000;

    const res = await fetch("/api/submit-score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pseudo, score }),
    });

    if (res.ok) setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      {!started && (
        <button
          onClick={handleStart}
          className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition"
        >
          Commencer la baston ! 🐢
        </button>
      )}

      {started && (
        <>
          <motion.div
            onClick={handleHit}
            className="mt-6 cursor-pointer select-none"
            animate={{ x: [0, -5, 5, -5, 0] }}
            transition={{ duration: 0.2 }}
            key={hits}
          >
            <Image
              src={`/images/omi0${imageIndex + 1}.png`}
              alt={`Mimizuki niveau ${imageIndex + 1}`}
              width={300}
              height={300}
              className="rounded shadow border-4 border-green-400 hover:scale-105 transition max-w-xs"
            />
          </motion.div>

          <p className="mt-4 text-green-800 font-semibold">
            Coups portés : {hits}
          </p>
        </>
      )}

      {endTime && (
        <div className="mt-6 flex flex-col items-center gap-3">
          {!submitted && (
            <>
              <p className="text-green-700 font-bold">
                Mimizuki est KO en {(endTime - startTime!) / 1000}s !
              </p>
              <input
                type="text"
                placeholder="Entre ton pseudo"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                className="px-4 py-2 border border-green-400 rounded"
              />
              <button
                onClick={handleSubmit}
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
              >
                Envoyer
              </button>
            </>
          )}

          {submitted && (
            <p className="text-green-800 font-semibold">
              Score enregistré ! T’es une légende de Tortue Land 🐢🏆
            </p>
          )}

          <button
            onClick={handleStart}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            🔁 Rejouer
          </button>
        </div>
      )}
    </div>
  );
}
