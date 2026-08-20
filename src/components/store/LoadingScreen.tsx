import { useEffect, useState } from "react";

interface LoadingScreenProps {
  duration?: number;
}

export function LoadingScreen({ duration = 1400 }: LoadingScreenProps) {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);
  const [logoExpanded, setLogoExpanded] = useState(true);

  useEffect(() => {
    // Iniciar o recolhimento suave das letras "orth" para "N." aos 300ms
    const logoTimer = setTimeout(() => {
      setLogoExpanded(false);
    }, 300);

    // Iniciar o fade-out da tela branca aos 900ms
    const fadeTimer = setTimeout(() => {
      setFade(true);
    }, Math.max(500, duration - 500));

    // Encerrar e remover a tela de loading aos 1400ms (1.4s)
    const endTimer = setTimeout(() => {
      setLoading(false);
    }, duration);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, [duration]);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-500 ease-in-out ${
        fade ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="font-display text-5xl sm:text-7xl uppercase tracking-tight text-black flex items-center justify-center">
        <span>N</span>
        <span
          className={`inline-block overflow-hidden transition-all duration-700 ease-in-out ${
            logoExpanded ? "max-w-[8rem] opacity-100" : "max-w-0 opacity-0"
          }`}
        >
          orth
        </span>
        <span className="text-primary">.</span>
      </div>
    </div>
  );
}
