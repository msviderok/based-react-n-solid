import { Toggle } from "@/components/ui/toggle";
import { allSectionsOpen, toggleAllSections } from "@/store";
import { useStore } from "@nanostores/react";

export function CollapseSwitch() {
  const isAllOpen = useStore(allSectionsOpen);

  return (
    <Toggle
      pressed={isAllOpen}
      onPressedChange={toggleAllSections}
      aria-label="Toggle expand all sections"
      className="hover:!bg-blue-400/5 data-[pressed]:!bg-blue-400/20 data-[pressed]:!text-white data-[pressed]:!shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)] data-[state=on]:!bg-blue-400/20 data-[state=on]:!text-white data-[state=on]:!shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)] aria-pressed:!bg-blue-400/20 aria-pressed:!text-white aria-pressed:!shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)]"
    >
      Expand All
    </Toggle>
  );
}
