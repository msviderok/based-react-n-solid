/** @jsxImportSource solid-js */
import { createSignal, onMount } from "solid-js";
import { LogoReact } from "./LogoReact";
import { LogoSolid } from "./LogoSolid";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

export function FrameworkSwitch() {
  const [currentFramework, setCurrentFramework] = createSignal<"react" | "solid">("react");

  onMount(() => {
    const pathname = window.location.pathname;
    if (pathname.includes("/layout/solid")) {
      setCurrentFramework("solid");
    } else {
      setCurrentFramework("react");
    }
  });

  return (
    <ToggleGroup
      variant="outline"
      aria-label="Framework view"
      class="w-full"
      value={currentFramework() === "solid" ? ["solid"] : ["react"]}
      onValueChange={(value) => {
        if (value.length > 0) {
          const framework = value[0] as "react" | "solid";
          window.location.href = `/layout/${framework}`;
        }
      }}
    >
      <ToggleGroupItem
        value="react"
        aria-label="React"
        class="hover:bg-zinc-700/15! data-pressed:bg-zinc-700/80! data-pressed:text-secondary-foreground! data-pressed:shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)]! data-[state=on]:bg-zinc-700/80! data-[state=on]:text-secondary-foreground! data-[state=on]:shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)]! aria-pressed:bg-zinc-700/80! aria-pressed:text-secondary-foreground! aria-pressed:shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)]!"
      >
        <LogoReact class="size-4" aria-hidden="true" />
        React
      </ToggleGroupItem>
      <ToggleGroupItem
        value="solid"
        aria-label="Solid"
        class="hover:bg-zinc-700/15! data-pressed:bg-zinc-700/80! data-pressed:text-secondary-foreground! data-pressed:shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)]! data-[state=on]:bg-zinc-700/80! data-[state=on]:text-secondary-foreground! data-[state=on]:shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)]! aria-pressed:bg-zinc-700/80! aria-pressed:text-secondary-foreground! aria-pressed:shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)]!"
      >
        <LogoSolid class="size-4" aria-hidden="true" />
        Solid
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
