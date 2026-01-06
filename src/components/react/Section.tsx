/** @jsxImportSource react */
import { allSectionsOpen, sections, styling, toggleSection } from "@/store";
import { cn } from "@/utils";
import { useStore } from "@nanostores/react";
import { useMemo, type PropsWithChildren } from "react";

interface Props {
  compName: string;
}

function Root({ compName, children }: PropsWithChildren<Props>) {
  const sectionsStore = useStore(sections);
  const allOpen = useStore(allSectionsOpen);
  const currentStyling = useStore(styling);

  const sectionState = useMemo(() => sectionsStore[compName], [sectionsStore, compName]);
  const isOpen = useMemo(() => sectionState?.open || allOpen, [sectionState, allOpen]);
  const isCssModules = useMemo(() => currentStyling === "CssModules", [currentStyling]);

  const formatComponentName = (name: string) => {
    return name
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("");
  };

  return (
    <section className="transition-all duration-200 mb-4 flex-auto">
      <button
        className={cn(
          "flex items-center px-3 py-2 font-mono text-xs rounded-sm hover:transition-all border mb-4 transition-all duration-200",
          isOpen && "mb-8 bg-linear-to-t to-transparent shadow-lg",
          isOpen && isCssModules && "from-purple-500/15 border-purple-500/15 shadow-purple-500/5",
          isOpen && !isCssModules && "from-blue-500/15 border-blue-500/15 shadow-blue-500/5",
          !isOpen && isCssModules && "border-purple-400/20",
          !isOpen && !isCssModules && "border-blue-400/20"
        )}
        onClick={() => toggleSection(compName)}
        aria-checked={isOpen}
      >
        <div className="flex items-center">
          <span className={cn("mr-0.5", isCssModules ? "text-purple-400/30" : "text-blue-400/30")}>
            &lt;
          </span>
          <span className="text-foreground font-mono">{formatComponentName(compName)}</span>
          <span className={cn("ml-0.5", isCssModules ? "text-purple-400/40" : "text-blue-400/40")}>
            /&gt;
          </span>
        </div>
      </button>

      <div className="space-y-8 py-6">{children}</div>
    </section>
  );
}

function Variant({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/60">
        <span className="h-px w-6 bg-border/40" aria-hidden="true" />
        <span>{name.replace("-", " ")}</span>
      </h3>
      <div className="comparison-grid grid gap-6 bg-black/40/80 p-4 py-6 sm:py-8 rounded-md border border-white/5 shadow-[0_0_0_1px_rgba(148,163,184,0.15)]">
        {children}
      </div>
    </div>
  );
}

function VariantItem({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
        {name}
      </span>
      <div className="flex flex-1 items-center justify-center">{children}</div>
    </div>
  );
}

export default {
  Root,
  Variant,
  VariantItem,
};
