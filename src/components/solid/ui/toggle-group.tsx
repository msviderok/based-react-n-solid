/** @jsxImportSource solid-js */
import type { Accessorify } from "@msviderok/base-ui-solid";
import { Toggle as TogglePrimitive } from "@msviderok/base-ui-solid/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@msviderok/base-ui-solid/toggle-group";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { createContext, splitProps, useContext, type JSX } from "solid-js";

const toggleVariants = cva(
  "hover:text-foreground aria-pressed:bg-muted focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[state=on]:bg-muted gap-1 rounded-md text-xs font-medium transition-all [&_svg:not([class*='size-'])]:size-3.5 group/toggle hover:bg-muted inline-flex items-center justify-center whitespace-nowrap outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 font-semibold tracking-[0.18em] uppercase cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-input hover:bg-muted border bg-transparent",
      },
      size: {
        default: "h-8 min-w-7 px-4 text-[10px]",
        sm: "h-6 min-w-6 rounded-[min(var(--radius-md),8px)] px-4 text-[0.625rem] [&_svg:not([class*='size-'])]:size-3",
        lg: "h-8 min-w-8 px-4",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
);

const ToggleGroupContext = createContext<
  Accessorify<
    VariantProps<typeof toggleVariants> & {
      spacing?: number;
      orientation?: "horizontal" | "vertical";
    }
  >
>({
  size: () => "default" as const,
  variant: () => "outline" as const,
  spacing: () => 0,
  orientation: () => "horizontal" as const,
});

function ToggleGroup(
  props: ToggleGroupPrimitive.Props &
    VariantProps<typeof toggleVariants> & {
      spacing?: number;
      orientation?: "horizontal" | "vertical";
    }
) {
  const [local, rest] = splitProps(props, [
    "class",
    "variant",
    "size",
    "spacing",
    "orientation",
    "children",
  ]);
  const spacing = () => local.spacing || 0;
  const orientation = () => local.orientation || "horizontal";
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={local.variant}
      data-size={local.size}
      data-spacing={spacing()}
      data-orientation={orientation()}
      style={{ "--gap": spacing() } as JSX.CSSProperties}
      class={cn(
        "rounded-md data-[size=sm]:rounded-[min(var(--radius-md),8px)] group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
        local.class
      )}
      {...rest}
    >
      <ToggleGroupContext.Provider
        value={{
          variant: () => local.variant,
          size: () => local.size,
          spacing,
          orientation,
        }}
      >
        {local.children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  );
}

function ToggleGroupItem(props: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  const [local, rest] = splitProps(props, ["class", "variant", "size", "children"]);
  const variant = () => local.variant || "outline";
  const size = () => local.size || "default";
  const context = useContext(ToggleGroupContext);

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={context.variant?.() || variant()}
      data-size={context.size?.() || size()}
      data-spacing={context.spacing?.()}
      class={cn(
        "group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-4 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-md group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-md group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-md group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-md shrink-0 focus:z-10 focus-visible:z-10 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t font-semibold tracking-[0.18em] uppercase flex-1",
        toggleVariants({
          variant: context.variant?.() || variant(),
          size: context.size?.() || size(),
        }),
        local.class
      )}
      {...rest}
    >
      {local.children}
    </TogglePrimitive>
  );
}

export { ToggleGroup, ToggleGroupItem };
