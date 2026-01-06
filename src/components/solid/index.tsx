/** @jsxImportSource solid-js */

import { styling } from "@/store";
import { useStore } from "@nanostores/solid";
import { Dynamic } from "solid-js/web";
import components from "./components";

export function SolidComponent(props: { component: string; type: string }) {
  const variant = useStore(styling);
  const Comp = (components as any)[props.component][props.type];
  return <Dynamic component={Comp[variant()]} />;
}
