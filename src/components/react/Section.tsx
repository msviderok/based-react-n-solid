import { LogoReact } from "@/components/react/LogoReact";
import { LogoSolid } from "@/components/react/LogoSolid";
import { Separator } from "@/components/ui/separator";
import { capitalize, cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

function Root(props: { component: string; children: React.ReactNode }) {
  return (
    <section id={props.component} className="scroll-mt-24 mb-16">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-3xl font-bold text-foreground/80 sticky top-0 left-0">
            {capitalize(props.component)}
          </h2>
        </div>
      </div>

      <div className="space-y-12 flex flex-col gap-4">{props.children}</div>
    </section>
  );
}

function Variant(props: { variant: string; minWidth?: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [enforceLayoutChange, setEnforceLayoutChange] = useState(false);

  useEffect(() => {
    if (ref.current && props.minWidth !== undefined) {
      if (ref.current.offsetWidth < props.minWidth) {
        setEnforceLayoutChange(true);
      }
    }
  }, [props.minWidth]);

  return (
    <div
      ref={ref}
      className={cn(
        "border border-border rounded-lg overflow-hidden bg-card shadow-sm flex flex-col shrink-0 relative"
      )}
    >
      <h3 className="font-semibold text-foreground py-3 px-4">{capitalize(props.variant)}</h3>

      <div
        data-enforce={enforceLayoutChange}
        className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-0 relative group",
          enforceLayoutChange ? `lg:grid-cols-1` : ""
        )}
      >
        {!enforceLayoutChange && (
          <Separator
            orientation="vertical"
            className="hidden lg:block absolute top-0 left-1/2 -translate-x-px h-full w-0! bg-muted border-dashed border-0 border-l border-l-muted-background opacity-30"
          />
        )}
        {props.children}
      </div>
    </div>
  );
}

function VariantSolid(props: { children: React.ReactNode }) {
  return (
    <div className="border-r border-border last:border-r-0">
      <div className="bg-solid/20 border-b border-border px-4 py-2 flex items-center gap-2 h-10 w-full">
        <LogoSolid className="size-4" />
        <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Solid
        </span>
      </div>
      <div className="p-6 flex justify-center group-data-[enforce=true]:block group-data-[enforce=true]:w-max group-data-[enforce=true]:mx-auto overflow-scroll w-full">
        {props.children}
      </div>
    </div>
  );
}

function VariantReact(props: { children: React.ReactNode }) {
  return (
    <div>
      <div className="bg-react/20 border-b border-border px-4 py-2 flex items-center gap-2 h-10 w-full">
        <LogoReact className="size-4" />
        <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
          React
        </span>
      </div>
      <div className="p-6 flex justify-center group-data-[enforce=true]:block group-data-[enforce=true]:w-max group-data-[enforce=true]:mx-auto overflow-scroll">
        {props.children}
      </div>
    </div>
  );
}

export default {
  Root,
  Variant,
  VariantSolid,
  VariantReact,
};
