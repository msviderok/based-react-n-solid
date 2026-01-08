/** @jsxImportSource solid-js */
import { cn } from "@/lib/utils";
import { splitProps, type ComponentProps } from "solid-js";

function Skeleton(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="skeleton"
      class={cn("bg-muted rounded-md animate-pulse", local.class)}
      {...rest}
    />
  );
}

export { Skeleton };
