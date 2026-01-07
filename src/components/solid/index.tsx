/** @jsxImportSource solid-js */
import { styling } from "@/lib/store";
import { useStore } from "@nanostores/solid";
import { Dynamic } from "solid-js/web";
import demos from "./demos";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./empty";

export function SolidComponent(props: { component: string; variant: string }) {
  const style = useStore(styling);
  const Comp = () => (demos as any)[props.component][props.variant][style()];
  const variantName = () => (style() === "CssModules" ? "CSS Modules" : "Tailwind");

  return (
    <Dynamic
      component={
        Comp() ??
        (() => (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CodeXml />
              </EmptyMedia>
              <EmptyTitle class="flex items-center gap-2">
                No {variantName()} <Frown />
              </EmptyTitle>
              <EmptyDescription>
                This variant doesn't have any {variantName()} version
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ))
      }
    />
  );
}

function CodeXml() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="m18 16 4-4-4-4"></path>
      <path d="m6 8-4 4 4 4"></path>
      <path d="m14.5 4-5 16"></path>
    </svg>
  );
}

function Frown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
      <line x1="9" x2="9.01" y1="9" y2="9"></line>
      <line x1="15" x2="15.01" y1="9" y2="9"></line>
    </svg>
  );
}
