/** @jsxImportSource solid-js */
import { styling } from "@/lib/store";
import { useStore } from "@nanostores/solid";
import { Dynamic } from "solid-js/web";
import demos from "./demos";

export function SolidComponent(props: { component: string; variant: string }) {
  const style = useStore(styling);
  const Comp = () => (demos as any)[props.component][props.variant][style()];
  return <Dynamic component={Comp()} />;
}
