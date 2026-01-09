/** @jsxImportSource solid-js */
import { isComponentAvailable } from "@/lib/isComponentAvailable";
import { styling } from "@/lib/store";
import { capitalize, cn } from "@/lib/utils";
import { useStore } from "@nanostores/solid";
import { createEffect, createSignal, Show, type ParentProps } from "solid-js";
import { LogoReact } from "./LogoReact";
import { LogoSolid } from "./LogoSolid";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

function Root(props: ParentProps<{ component: string }>) {
  return (
    <section id={props.component} class="scroll-mt-24 mb-16">
      <div class="sticky top-0 z-10 bg-background pb-2 pt-2 -mx-8 px-8">
        <h2 class="text-3xl font-bold text-foreground/80">{capitalize(props.component)}</h2>
      </div>

      <div class="space-y-12 flex flex-col gap-6">{props.children}</div>
    </section>
  );
}

function Variant(
  props: ParentProps<{
    component: string;
    variant: string;
    minWidth?: number;
  }>
) {
  let ref: HTMLDivElement | undefined;
  const [enforceLayoutChange, setEnforceLayoutChange] = createSignal(false);
  const currentStyle = useStore(styling);
  const availability = () => isComponentAvailable(props.component, props.variant, currentStyle());

  createEffect(() => {
    if (ref && props.minWidth !== undefined) {
      if (ref.offsetWidth < props.minWidth * 2) {
        setEnforceLayoutChange(true);
      }
    }
  });

  return (
    <Show
      when={availability().react && availability().solid}
      fallback={
        <div class="relative">
          <div class="mb-2 flex items-center gap-2">
            <span class="text-xs font-medium text-foreground/60 uppercase tracking-wider line-through">
              {capitalize(props.variant)}
            </span>
            <Badge
              variant="outline"
              class="text-xs bg-amber-50/50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/50 flex items-center gap-1"
            >
              No {currentStyle() === "CssModules" ? "CSS Modules" : "Tailwind"} version <Frown />
            </Badge>
          </div>
        </div>
      }
    >
      <div ref={ref} class="relative">
        <div class="mb-2">
          <span class="text-xs font-medium text-foreground/60 uppercase tracking-wider">
            {capitalize(props.variant)}
          </span>
        </div>

        <div
          data-enforce={enforceLayoutChange()}
          class={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-0 relative group border border-border rounded-lg overflow-hidden",
            enforceLayoutChange() ? `lg:grid-cols-1` : ""
          )}
        >
          {!enforceLayoutChange() && (
            <div class="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 h-full w-px bg-border z-10" />
          )}
          {props.children}
        </div>
      </div>
    </Show>
  );
}

function VariantSolid(props: ParentProps) {
  return (
    <div class="relative bg-card">
      <div class="absolute inset-0 bg-muted/5 pointer-events-none" />
      <div class="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden">
        <div
          class="absolute inset-0"
          style={{
            "background-image": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 166 155.3'%3E%3Cpath d='M163 35S110-4 69 5l-3 1c-6 2-11 5-14 9l-2 3-15 26 26 5c11 7 25 10 38 7l46 9 18-30z' fill='%23000'/%3E%3Cpath d='M52 35l-4 1c-17 5-22 21-13 35 10 13 31 20 48 15l62-21S92 26 52 35z' fill='%23000'/%3E%3Cpath d='M134 80a45 45 0 00-48-15L24 85 4 120l112 19 20-36c4-7 3-15-2-23z' fill='%23000'/%3E%3Cpath d='M114 115a45 45 0 00-48-15L4 120s53 40 94 30l3-1c17-5 23-21 13-34z' fill='%23000'/%3E%3C/svg%3E")`,
            "background-repeat": "repeat",
            "background-size": "120px 112px",
          }}
        />
      </div>
      <div class="absolute top-0 right-0 z-10">
        <div class="bg-muted border-l border-b border-border px-2 py-1.5 rounded-bl-lg">
          <LogoSolid class="size-4" />
        </div>
      </div>
      <Separator orientation="horizontal" class="absolute top-0 left-0 right-0" />
      <div class="relative p-6 pt-10 flex justify-center group-data-[enforce=true]:block group-data-[enforce=true]:w-max group-data-[enforce=true]:mx-auto overflow-scroll w-full">
        {props.children}
      </div>
    </div>
  );
}

function VariantReact(props: ParentProps) {
  return (
    <div class="relative bg-card">
      <div class="absolute inset-0 bg-muted/5 pointer-events-none" />
      <div class="absolute inset-0 opacity-[0.05]">
        <div
          class="absolute inset-0"
          style={{
            "background-image": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-11.5 -10.23174 23 20.46348'%3E%3Ctitle%3EReact Logo%3C/title%3E%3Ccircle cx='0' cy='0' r='2.05' fill='%23000'/%3E%3Cg stroke='%23000' stroke-width='1' fill='none'%3E%3Cellipse rx='11' ry='4.2'/%3E%3Cellipse rx='11' ry='4.2' transform='rotate(60)'/%3E%3Cellipse rx='11' ry='4.2' transform='rotate(120)'/%3E%3C/g%3E%3C/svg%3E")`,
            "background-repeat": "repeat",
            "background-size": "80px 71px",
          }}
        />
      </div>
      <div class="absolute top-0 right-0 z-10">
        <div class="bg-muted border-l border-b border-border px-2 py-1.5 rounded-bl-lg">
          <LogoReact class="size-4" />
        </div>
      </div>
      <Separator orientation="horizontal" class="absolute top-0 left-0 right-0" />
      <div class="relative p-6 pt-10 flex justify-center group-data-[enforce=true]:block group-data-[enforce=true]:w-max group-data-[enforce=true]:mx-auto overflow-scroll">
        {props.children}
      </div>
    </div>
  );
}

function Frown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      class="inline-block scale-120"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
      <line x1="9" x2="9.01" y1="9" y2="9"></line>
      <line x1="15" x2="15.01" y1="9" y2="9"></line>
    </svg>
  );
}

export default {
  Root,
  Variant,
  VariantSolid,
  VariantReact,
};
