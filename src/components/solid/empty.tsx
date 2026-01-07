/** @jsxImportSource solid-js */
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { splitProps, type ComponentProps } from "solid-js";

function Empty(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="empty"
      class={cn(
        "gap-4 rounded-xl border-dashed p-6 flex w-full min-w-0 flex-1 flex-col items-center justify-center text-center text-balance text-muted-foreground",
        local.class
      )}
      {...rest}
    />
  );
}

function EmptyHeader(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="empty-header"
      class={cn("gap-1 flex max-w-sm flex-col items-center", local.class)}
      {...rest}
    />
  );
}

const emptyMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted text-foreground flex size-8 shrink-0 items-center justify-center rounded-md [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function EmptyMedia(props: ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  const [local, rest] = splitProps(props, ["class", "variant"]);
  const variant = () => local.variant || "default";
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant()}
      class={cn(
        emptyMediaVariants({ variant: variant(), class: local.class }),
        "text-muted-foreground"
      )}
      {...rest}
    />
  );
}

function EmptyTitle(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="empty-title"
      class={cn("text-sm font-medium tracking-tight", local.class)}
      {...rest}
    />
  );
}

function EmptyDescription(props: ComponentProps<"p">) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="empty-description"
      class={cn(
        "text-xs/relaxed text-muted-foreground [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        local.class
      )}
      {...rest}
    />
  );
}

function EmptyContent(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="empty-content"
      class={cn(
        "gap-2 text-xs/relaxed flex w-full max-w-sm min-w-0 flex-col items-center text-balance",
        local.class
      )}
      {...props}
    />
  );
}

export { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle };
