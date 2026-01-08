/** @jsxImportSource solid-js */
import { cn } from "@/lib/utils";
import type { ComponentProps } from "solid-js";
import { splitProps } from "solid-js";

function Label(props: ComponentProps<"label">) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <label
      data-slot="label"
      class={cn(
        "gap-2 text-xs/relaxed leading-none font-medium group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed",
        local.class
      )}
      {...rest}
    />
  );
}

export { Label };
