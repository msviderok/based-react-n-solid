import { styling } from "@/lib/store";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";

export function AppLayoutEffects() {
  const currentStyling = useStore(styling);

  useEffect(() => {
    const root = document.getElementById("app-root");
    const header = document.getElementById("app-header");

    if (!root || !header) return;

    const onScroll = () => {
      const scrolled = window.scrollY > 30;
      header.dataset.scrolled = scrolled ? "true" : "false";
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Update background when styling changes
  useEffect(() => {
    const root = document.getElementById("app-root");
    const header = document.getElementById("app-header");

    if (!root || !header) return;

    // Reset any previous custom color
    root.style.backgroundImage = "";
    root.style.backgroundColor = "";
    header.style.backgroundColor = "";

    if (currentStyling === "Tailwind") {
      // Barely blue-leaning black
      const bg = "rgb(6, 8, 12)";
      root.style.backgroundColor = bg;
      header.style.backgroundColor = "rgba(6, 8, 12, 0.96)";
    } else if (currentStyling === "CssModules") {
      // Barely purple-leaning black
      const bg = "rgb(8, 6, 12)";
      root.style.backgroundColor = bg;
      header.style.backgroundColor = "rgba(8, 6, 12, 0.96)";
    }
  }, [currentStyling]);

  return null;
}
