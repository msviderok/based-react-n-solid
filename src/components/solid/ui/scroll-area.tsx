/** @jsxImportSource solid-js */
import { cn } from "@/lib/utils";
import { ScrollArea as ScrollAreaPrimitive } from "@msviderok/base-ui-solid/scroll-area";
import { splitProps } from "solid-js";

function ScrollArea(props: ScrollAreaPrimitive.Root.Props) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <ScrollAreaPrimitive.Root data-slot="scroll-area" class={cn("relative", local.class)} {...rest}>
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        class="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {local.children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar(props: ScrollAreaPrimitive.Scrollbar.Props) {
  const [local, rest] = splitProps(props, ["class", "orientation"]);
  const orientation = () => local.orientation || "vertical";
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation()}
      orientation={orientation()}
      class={cn(
        "data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent flex touch-none p-px transition-colors select-none",
        local.class
      )}
      {...rest}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        class="rounded-full bg-border relative flex-1"
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
}

export { ScrollArea, ScrollBar };
