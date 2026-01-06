import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { styling } from "@/store";
import { cn } from "@/utils";
import { useStore } from "@nanostores/react";

export function StyleSwitch() {
  const currentStyling = useStore(styling);
  const isCssModules = currentStyling === "CssModules";

  return (
    <ToggleGroup
      variant="outline"
      aria-label="Style view"
      value={isCssModules ? ["CssModules"] : ["Tailwind"]}
      onValueChange={(value) => {
        if (value.length > 0) {
          styling.set(value[0]);
        }
      }}
    >
      <ToggleGroupItem
        value="Tailwind"
        aria-label="Tailwind"
        className="hover:!bg-blue-500/15 data-[pressed]:!bg-blue-500/80 data-[pressed]:!text-white data-[pressed]:!shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)] data-[state=on]:!bg-blue-500/80 data-[state=on]:!text-white data-[state=on]:!shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)] aria-pressed:!bg-blue-500/80 aria-pressed:!text-white aria-pressed:!shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)]"
      >
        Tailwind
      </ToggleGroupItem>
      <ToggleGroupItem
        value="CssModules"
        aria-label="CSS Modules"
        className="hover:!bg-purple-500/15 data-[pressed]:!bg-purple-500/80 data-[pressed]:!text-white data-[pressed]:!shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)] data-[state=on]:!bg-purple-500/80 data-[state=on]:!text-white data-[state=on]:!shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)] aria-pressed:!bg-purple-500/80 aria-pressed:!text-white aria-pressed:!shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)]"
      >
        CSS Modules
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
