import { useEffect, useRef } from "react";

type SoundStep = {
  threshold: number;
  key: string;
  repeat?: number;
};

const soundSteps: SoundStep[] = [
  { threshold: 0, key: "fight" },
  { threshold: 1, key: "hahalong" },
  { threshold: 25, key: "tortue" },
  { threshold: 35, key: "hahacourt" },
  { threshold: 45, key: "oufti" },
  { threshold: 55, key: "connasse" },
  { threshold: 65, key: "hahamoyen" },
  { threshold: 75, key: "putain01" },
  { threshold: 85, key: "oufti" },
  { threshold: 95, key: "grognasse" },
  { threshold: 115, key: "putain03" },
  { threshold: 125, key: "connasse" },
  { threshold: 135, key: "putain03" },
  { threshold: 145, key: "putain02" },
  { threshold: 155, key: "putain03" },
  { threshold: 165, key: "connasse" },
  { threshold: 170, key: "putain03" },
  { threshold: 175, key: "end" },
];

export function useMimizukiSounds(hits: number) {
  const lastPlayedRef = useRef<string | null>(null);
  const putain03CountRef = useRef(0);

  useEffect(() => {
    const step = soundSteps.findLast((s) => hits >= s.threshold);

    if (!step || step.key === lastPlayedRef.current) return;

    // Gestion spéciale pour putain03 répété
    if (step.key === "putain03") {
      if (putain03CountRef.current < (step.repeat ?? 1)) {
        const audio = new Audio(`/sounds/${step.key}.mp3`);
        audio.play();
        putain03CountRef.current += 1;
        return;
      }
    }

    const audio = new Audio(`/sounds/${step.key}.mp3`);
    audio.play();

    lastPlayedRef.current = step.key;
  }, [hits]);
}
