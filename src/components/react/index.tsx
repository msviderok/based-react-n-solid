/** @jsxImportSource react */
import { styling } from "@/lib/store";
import { useStore } from "@nanostores/react";
import demos from "./demos";

export function ReactComponent({ component, variant }: { component: string; variant: string }) {
  const style = useStore(styling);
  const Comp = (demos as any)[component][variant][style];
  return Comp ? <Comp /> : null;
}
