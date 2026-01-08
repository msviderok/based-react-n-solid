/** @jsxImportSource solid-js */
import { Separator as SeparatorPrimitive } from "@msviderok/base-ui-solid/separator";

import { cn } from "@/lib/utils";
import { splitProps } from "solid-js";

function Separator(props: SeparatorPrimitive.Props) {
  const [local, rest] = splitProps(props, ["class", "orientation"]);
  const orientation = () => local.orientation || "horizontal";
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation()}
      class={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
        local.class
      )}
      {...rest}
    />
  );
}

export { Separator };
