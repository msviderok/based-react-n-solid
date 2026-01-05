/** @jsxImportSource solid-js */

import { styling } from "@/store";
import { useStore } from "@nanostores/solid";
import { Dynamic } from "solid-js/web";
import components from "./components";

export function SolidComponent(props: { component: string; type: string }) {
  const variant = useStore(styling);
  const Comp = components[props.component as keyof typeof components];
  return <Dynamic component={Comp[props.type as keyof typeof Comp][variant()]} />;
}
