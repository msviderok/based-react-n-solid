/** @jsxImportSource solid-js */
import { solidComponentLoaded, styling } from "@/lib/store";
import { useStore } from "@nanostores/solid";
import { onMount } from "solid-js";
import { Dynamic } from "solid-js/web";
import demos from "./demos";

export default function SolidDemo(props: { component: string; variant: string }) {
  const style = useStore(styling);
  const Comp = () => (demos as any)[props.component][props.variant][style()];

  onMount(() => {
    solidComponentLoaded.setKey(props.component, true);
  });

  return <Dynamic component={Comp()} />;
}
