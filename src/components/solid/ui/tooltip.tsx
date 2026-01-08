/** @jsxImportSource solid-js */
import { Tooltip as TooltipPrimitive } from "@msviderok/base-ui-solid/tooltip";
import { splitProps } from "solid-js";

import { cn } from "@/lib/utils";

function TooltipProvider(props: TooltipPrimitive.Provider.Props) {
  const [local, rest] = splitProps(props, ["delay"]);
  const delay = () => local.delay || 0;
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delay={delay()} {...rest} />;
}

function Tooltip(props: TooltipPrimitive.Root.Props) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger(props: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent(
  props: TooltipPrimitive.Popup.Props &
    Pick<TooltipPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">
) {
  const [local, rest] = splitProps(props, [
    "class",
    "side",
    "sideOffset",
    "align",
    "alignOffset",
    "children",
  ]);
  const side = () => local.side || "top";
  const sideOffset = () => local.sideOffset || 4;
  const align = () => local.align || "center";
  const alignOffset = () => local.alignOffset || 0;
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align()}
        alignOffset={alignOffset()}
        side={side()}
        sideOffset={sideOffset()}
        class="isolate z-50"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          class={cn(
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 rounded-md px-3 py-1.5 text-xs **:data-[slot=kbd]:rounded-md bg-accent border text-foreground z-50 w-fit max-w-xs origin-(--transform-origin)",
            local.class
          )}
          {...props}
        >
          {local.children}
          {/* <TooltipPrimitive.Arrow class="size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-accent fill-background z-50 data-[side=bottom]:top-1 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" /> */}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
