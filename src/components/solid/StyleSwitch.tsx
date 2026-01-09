/** @jsxImportSource solid-js */
import { styling } from "@/lib/store";
import { useStore } from "@nanostores/solid";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

export function StyleSwitch() {
  const currentStyling = useStore(styling);
  const isCssModules = () => currentStyling() === "CssModules";

  return (
    <ToggleGroup
      variant="outline"
      aria-label="Style view"
      class="w-full"
      value={isCssModules() ? ["CssModules"] : ["Tailwind"]}
      onValueChange={(value) => {
        if (value.length > 0) {
          styling.set(value[0]);
        }
      }}
    >
      <ToggleGroupItem
        value="Tailwind"
        aria-label="Tailwind"
        class="hover:bg-primary/15! data-pressed:bg-primary/30! data-pressed:text-secondary-foreground! data-pressed:shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)]! data-[state=on]:bg-primary/30! data-[state=on]:text-secondary-foreground! data-[state=on]:shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)]! aria-pressed:bg-primary/30! aria-pressed:text-secondary-foreground! aria-pressed:shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)]!"
      >
        Tailwind
      </ToggleGroupItem>
      <ToggleGroupItem
        value="CssModules"
        aria-label="CSS Modules"
        class="css-modules hover:bg-primary/15! data-pressed:bg-primary/30! data-pressed:text-secondary-foreground! data-pressed:shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)]! data-[state=on]:bg-primary/30! data-[state=on]:text-secondary-foreground! data-[state=on]:shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)]! aria-pressed:bg-primary/30! aria-pressed:text-secondary-foreground! aria-pressed:shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)]!"
      >
        CSS Modules
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
