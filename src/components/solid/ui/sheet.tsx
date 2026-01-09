/** @jsxImportSource solid-js */
import { Dialog as SheetPrimitive } from "@msviderok/base-ui-solid/dialog";

import { cn } from "@/lib/utils";
import { XIcon } from "lucide-solid";
import { splitProps, type ComponentProps } from "solid-js";
import { Button } from "./button";

function Sheet(props: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger(props: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose(props: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal(props: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay(props: SheetPrimitive.Backdrop.Props) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      class={cn(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/80 duration-100 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs fixed inset-0",
        local.class
      )}
      {...rest}
    />
  );
}

function SheetContent(
  props: SheetPrimitive.Popup.Props & {
    side?: "top" | "right" | "bottom" | "left";
    showCloseButton?: boolean;
  }
) {
  const [local, rest] = splitProps(props, ["class", "children", "side", "showCloseButton"]);
  const side = () => local.side || "right";
  const showCloseButton = () => local.showCloseButton || true;
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side()}
        class={cn(
          "bg-background data-open:animate-in data-closed:animate-out data-[side=right]:data-closed:slide-out-to-right-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=top]:data-closed:slide-out-to-top-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:fade-out-0 data-open:fade-in-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=bottom]:data-open:slide-in-from-bottom-10 fixed z-50 flex flex-col bg-clip-padding text-xs/relaxed shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm",
          local.class
        )}
        {...rest}
      >
        {local.children}
        {showCloseButton() && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={(props) => (
              <Button variant="ghost" class="absolute top-4 right-4" size="icon-sm" {...props} />
            )}
          >
            <XIcon />
            <span class="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  );
}
function SheetHeader(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div data-slot="sheet-header" class={cn("gap-1.5 p-6 flex flex-col", local.class)} {...rest} />
  );
}

function SheetFooter(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="sheet-footer"
      class={cn("gap-2 p-6 mt-auto flex flex-col", local.class)}
      {...rest}
    />
  );
}

function SheetTitle(props: SheetPrimitive.Title.Props) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      class={cn("text-foreground text-sm font-medium", local.class)}
      {...rest}
    />
  );
}

function SheetDescription(props: SheetPrimitive.Description.Props) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      class={cn("text-muted-foreground text-xs/relaxed", local.class)}
      {...rest}
    />
  );
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
