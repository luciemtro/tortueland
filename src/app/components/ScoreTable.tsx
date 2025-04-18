"use client";

import { useEffect, useState } from "react";
import { tdStyle } from "../../lib/tableStyles";

type Score = {
  id: string;
  pseudo: string;
  score_seconds: number;
  created_at: string;
};

export default function ScoreTable() {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      const res = await fetch("/api/get-scores");
      const data = await res.json();
      setScores(data);
      setLoading(false);
    };

    fetchScores();
  }, []);

  return (
    <div className="mt-10 text-center">
      <h2 className="text-xl font-bold mb-4 text-green-800">
        🏁 Classement des tueurs de Mimizuki 🐢
      </h2>
      {loading ? (
        <p className="text-green-600">Chargement des scores...</p>
      ) : (
        <table className="mx-auto border border-green-700 rounded overflow-hidden shadow-lg">
          <thead>
            <tr>
              <th className={tdStyle({ position: "head" })}>#</th>
              <th className={tdStyle({ position: "head" })}>Pseudo</th>
              <th className={tdStyle({ position: "head" })}>Temps (s)</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={score.id}>
                <td
                  className={tdStyle({
                    position: index === 0 ? "first" : "body",
                  })}
                >
                  {index + 1}
                </td>
                <td
                  className={tdStyle({
                    position: index === 0 ? "first" : "body",
                  })}
                >
                  {score.pseudo}
                </td>
                <td
                  className={tdStyle({
                    position: index === 0 ? "first" : "body",
                  })}
                >
                  {score.score_seconds.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
