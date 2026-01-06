/** @jsxImportSource react */

import { styling } from "@/store";
import { useStore } from "@nanostores/react";
import components from "./components";

export function ReactComponent({ component, type }: { component: string; type: string }) {
  const variant = useStore(styling);
  const Comp = (components as any)[component][type][variant];
  return <Comp />;
}
