"use client";

import { useEffect, useState } from "react";
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
  const [clickEffects, setClickEffects] = useState<
    { x: number; y: number; id: string }[]
  >([]);

  useMimizukiSounds(hits);

  // ✅ Précharger les images au chargement de la page
  useEffect(() => {
    for (let i = 1; i <= IMAGE_COUNT; i++) {
      const img = new window.Image();
      img.src = `/images/omi0${i}.png`;
    }
  }, []);

  const playClickSound = () => {
    const shots = ["shot01", "shot02", "shot03"];
    const random = shots[Math.floor(Math.random() * shots.length)];
    const audio = new Audio(`/sounds/${random}.mp3`);
    audio.play();
  };

  const spawnClickEffect = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = crypto.randomUUID();

    setClickEffects((prev) => [...prev, { x, y, id }]);

    setTimeout(() => {
      setClickEffects((prev) => prev.filter((effect) => effect.id !== id));
    }, 1000);
  };

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
    if (!started || endTime || hits >= 175) return;

    const newHits = hits + 1;
    setHits(newHits);
    playClickSound();

    const nextIndex = HIT_THRESHOLDS.findIndex((thresh) => newHits < thresh);
    const index = nextIndex === -1 ? IMAGE_COUNT - 1 : nextIndex - 1;
    setImageIndex(index);

    if (newHits === 175) {
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
            onClick={(e) => {
              handleHit();
              spawnClickEffect(e);
            }}
            className="mt-6 cursor-pointer select-none relative w-fit"
            animate={{ x: [0, -5, 5, -5, 0] }}
            transition={{ duration: 0.2 }}
            key={hits}
          >
            {/* 🎯 Effets visuels en GIF (plus gros sur mobile) */}
            {clickEffects.map((effect) => (
              <Image
                key={effect.id}
                src="/gifs/impact.gif"
                alt="Impact"
                width={200}
                height={200}
                className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-[90] w-24 h-24 sm:w-40 sm:h-40"
                style={{ left: effect.x, top: effect.y }}
              />
            ))}

            {/* 🥊 Image de Mimizuki */}
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
