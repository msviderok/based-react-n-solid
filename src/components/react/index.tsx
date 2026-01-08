/** @jsxImportSource react */
import { reactComponentLoaded, styling } from "@/lib/store";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import demos from "./demos";

export function ReactComponent({ component, variant }: { component: string; variant: string }) {
  const style = useStore(styling);
  const Comp = (demos as any)[component][variant][style];

  useEffect(() => {
    reactComponentLoaded.setKey(component, true);
  }, []);

  return Comp ? <Comp /> : null;
}
