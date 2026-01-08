import { createEffect, createSignal, onCleanup, type Accessor } from "solid-js";

export function useIsMobile(mobileBreakpoint: Accessor<number> | number = 768) {
  const [isMobile, setIsMobile] = createSignal<boolean>();
  const breakpoint = () =>
    typeof mobileBreakpoint === "function" ? mobileBreakpoint() : mobileBreakpoint;

  createEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint() - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < breakpoint());
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < breakpoint());
    onCleanup(() => mql.removeEventListener("change", onChange));
  });

  return () => !!isMobile();
}
