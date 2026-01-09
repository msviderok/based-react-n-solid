/** @jsxImportSource solid-js */
import { cn } from "@/lib/utils";
import type { Accessorify } from "@msviderok/base-ui-solid";
import { combineStyle, mergeProps } from "@msviderok/base-ui-solid/merge-props";
import { useRender } from "@msviderok/base-ui-solid/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import {
  createContext,
  createEffect,
  createSignal,
  Match,
  onCleanup,
  Show,
  splitProps,
  Switch,
  useContext,
  type Accessor,
  type ComponentProps,
} from "solid-js";
import { Button } from "./button";
import { ScrollArea } from "./scroll-area";
import { Separator } from "./separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./sheet";
import { Skeleton } from "./skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "16rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextProps = Accessorify<{
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
}>;

const SidebarContext = createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

function SidebarProvider(
  props: ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
) {
  const [local, rest] = splitProps(props, [
    "class",
    "defaultOpen",
    "open",
    "onOpenChange",
    "children",
    "style",
  ]);
  const defaultOpen = () => local.defaultOpen || true;
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = createSignal(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = createSignal<boolean>(defaultOpen());
  const open = () => local.open ?? _open();
  const setOpen = (value: boolean | ((value: boolean) => boolean)) => {
    console.log({ value });
    const openState = typeof value === "function" ? value(open()) : value;
    if (local.onOpenChange) {
      local.onOpenChange(openState);
    } else {
      _setOpen(openState);
    }

    // This sets the cookie to keep the sidebar state.
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
  };

  // Helper to toggle the sidebar.
  const toggleSidebar = () => {
    return isMobile() ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  };

  // Adds a keyboard shortcut to toggle the sidebar.
  createEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    onCleanup(() => window.removeEventListener("keydown", handleKeyDown));
  });

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = () => (open() ? "expanded" : "collapsed");

  const contextValue: SidebarContextProps = {
    state,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={combineStyle(
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          },
          local.style
        )}
        class={cn(
          "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
          local.class
        )}
        {...rest}
      >
        {local.children}
      </div>
    </SidebarContext.Provider>
  );
}

function Sidebar(
  props: ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offExamples" | "icon" | "none";
  }
) {
  const [local, rest] = splitProps(props, ["side", "variant", "collapsible", "class", "children"]);
  const side = () => local.side || "left";
  const variant = () => local.variant || "sidebar";
  const collapsible = () => local.collapsible || "offExamples";
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  return (
    <Switch
      fallback={
        <div
          class="group peer text-sidebar-foreground hidden md:block"
          data-state={state()}
          data-collapsible={state() === "collapsed" ? collapsible() : ""}
          data-variant={variant()}
          data-side={side()}
          data-slot="sidebar"
        >
          {/* This is what handles the sidebar gap on desktop */}
          <div
            data-slot="sidebar-gap"
            class={cn(
              "transition-[width] duration-150 ease-out relative w-(--sidebar-width) bg-transparent",
              "group-data-[collapsible=offExamples]:w-0",
              "group-data-[side=right]:rotate-180",
              variant() === "floating" || variant() === "inset"
                ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
                : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )}
          />
          <div
            data-slot="sidebar-container"
            class={cn(
              "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-150 ease-out md:flex",
              side() === "left"
                ? "left-0 group-data-[collapsible=offExamples]:left-[calc(var(--sidebar-width)*-1)]"
                : "right-0 group-data-[collapsible=offExamples]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              variant() === "floating" || variant() === "inset"
                ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
                : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              local.class
            )}
            {...rest}
          >
            <div
              data-sidebar="sidebar"
              data-slot="sidebar-inner"
              class="bg-sidebar group-data-[variant=floating]:ring-sidebar-border group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 flex size-full flex-col"
            >
              {local.children}
            </div>
          </div>
        </div>
      }
    >
      <Match when={collapsible() === "none"}>
        <div
          data-slot="sidebar"
          class={cn(
            "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
            local.class
          )}
          {...rest}
        >
          {local.children}
        </div>
      </Match>
      <Match when={isMobile()}>
        <Sheet open={openMobile()} onOpenChange={setOpenMobile} {...rest}>
          <SheetContent
            data-sidebar="sidebar"
            data-slot="sidebar"
            data-mobile="true"
            class="bg-sidebar text-sidebar-foreground p-0 [&>button]:hidden w-(--sidebar-width)!"
            style={{
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              width: SIDEBAR_WIDTH_MOBILE,
            }}
            side={side()}
          >
            <SheetHeader class="sr-only">
              <SheetTitle>Sidebar</SheetTitle>
              <SheetDescription>Displays the mobile sidebar.</SheetDescription>
            </SheetHeader>
            <div class="flex h-full w-full flex-col">{local.children}</div>
          </SheetContent>
        </Sheet>
      </Match>
    </Switch>
  );
}

function SidebarTrigger(props: ComponentProps<typeof Button>) {
  const [local, rest] = splitProps(props, ["class", "onClick"]);
  const { toggleSidebar, open } = useSidebar();

  return (
    <Tooltip>
      <TooltipTrigger
        render={(p) => (
          <Button
            {...p}
            data-sidebar="trigger"
            data-slot="sidebar-trigger"
            variant="ghost"
            size="icon-sm"
            class={cn(local.class)}
            onClick={(event) => {
              (local.onClick as any)?.(event);
              toggleSidebar();
            }}
            {...rest}
          >
            <ToggleIcon
              class={cn(
                "size-4 transition-transform duration-150 ease-out",
                open() ? "rotate-y-180" : ""
              )}
            />

            <span class="sr-only">Toggle Sidebar</span>
          </Button>
        )}
      ></TooltipTrigger>

      <TooltipContent side="right" sideOffset={10}>
        <p>{open() ? "Close Sidebar" : "Open Sidebar"}</p>
      </TooltipContent>
    </Tooltip>
  );
}

function SidebarRail(props: ComponentProps<"button">) {
  const [local, rest] = splitProps(props, ["class"]);
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      class={cn(
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-out group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offExamples]:bg-sidebar group-data-[collapsible=offExamples]:translate-x-0 group-data-[collapsible=offExamples]:after:left-full",
        "[[data-side=left][data-collapsible=offExamples]_&]:-right-2",
        "[[data-side=right][data-collapsible=offExamples]_&]:-left-2",
        local.class
      )}
      {...rest}
    />
  );
}

function SidebarInset(props: ComponentProps<"main">) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <main
      data-slot="sidebar-inset"
      class={cn(
        "bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2 relative flex w-full flex-1 flex-col",
        local.class
      )}
      {...rest}
    />
  );
}

function SidebarHeader(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      class={cn("gap-2 p-2 flex flex-col", local.class)}
      {...rest}
    />
  );
}

function SidebarFooter(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      class={cn("gap-2 p-2 flex flex-col", local.class)}
      {...rest}
    />
  );
}

function SidebarSeparator(props: ComponentProps<typeof Separator>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      class={cn("bg-sidebar-border mx-2 w-auto", local.class)}
      {...rest}
    />
  );
}

function SidebarContent(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <ScrollArea
      data-slot="sidebar-content"
      data-sidebar="content"
      class={cn(
        "no-scrollbar gap-0 flex min-h-0 flex-1 flex-col overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        local.class
      )}
      {...rest}
    />
  );
}

function SidebarGroup(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      class={cn("px-2 py-1 relative flex w-full min-w-0 flex-col", local.class)}
      {...rest}
    />
  );
}

function SidebarGroupLabel(props: useRender.ComponentProps<"div"> & ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class", "render"]);
  const element = useRender({
    props: mergeProps<"div">(
      {
        get class() {
          return cn(
            "text-sidebar-foreground/70 ring-sidebar-ring h-8 rounded-md px-2 text-xs transition-[margin,opacity] duration-150 ease-out group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 flex shrink-0 items-center outline-hidden [&>svg]:shrink-0",
            local.class
          );
        },
      },
      rest
    ),
    get render() {
      return local.render ?? "div";
    },
    state: {
      slot: "sidebar-group-label",
      sidebar: "group-label",
    },
  });

  return <>{element()}</>;
}

function SidebarGroupAction(props: useRender.ComponentProps<"button"> & ComponentProps<"button">) {
  const [local, rest] = splitProps(props, ["class", "render"]);
  const element = useRender({
    props: mergeProps<"button">(
      {
        get class() {
          return cn(
            "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 w-5 rounded-md p-0 focus-visible:ring-2 [&>svg]:size-4 flex aspect-square items-center justify-center outline-hidden transition-transform [&>svg]:shrink-0 after:absolute after:-inset-2 md:after:hidden group-data-[collapsible=icon]:hidden",
            local.class
          );
        },
      },
      rest
    ),
    get render() {
      return local.render ?? "button";
    },
    state: {
      slot: "sidebar-group-action",
      sidebar: "group-action",
    },
  });

  return <>{element()}</>;
}

function SidebarGroupContent(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      class={cn("text-xs w-full", local.class)}
      {...rest}
    />
  );
}

function SidebarMenu(props: ComponentProps<"ul">) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      class={cn("gap-px flex w-full min-w-0 flex-col data-[mobile=true]:gap-1.5", local.class)}
      {...rest}
    />
  );
}

function SidebarMenuItem(props: ComponentProps<"li">) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      class={cn("group/menu-item relative", local.class)}
      {...rest}
    />
  );
}

const sidebarMenuButtonVariants = cva(
  "ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground gap-2 rounded-[calc(var(--radius-sm)+2px)] p-2 text-left text-xs transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! focus-visible:ring-2 data-active:font-medium peer/menu-button flex w-full items-center overflow-hidden outline-hidden group/menu-button disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background hover:bg-sidebar-accent hover:text-sidebar-accent-foreground shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-xs",
        sm: "h-7 text-xs",
        lg: "h-12 text-xs group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function SidebarMenuButton(
  props: useRender.ComponentProps<"button"> &
    ComponentProps<"button"> & {
      isActive?: boolean;
      tooltip?: string | ComponentProps<typeof TooltipContent>;
    } & VariantProps<typeof sidebarMenuButtonVariants>
) {
  const [local, rest] = splitProps(props, [
    "class",
    "isActive",
    "variant",
    "size",
    "tooltip",
    "render",
  ]);
  const isActive = () => local.isActive || false;
  const variant = () => local.variant || "default";
  const size = () => local.size || "default";
  const { isMobile, state } = useSidebar();
  const comp = useRender({
    props: mergeProps<"button">(
      {
        get class() {
          return cn(sidebarMenuButtonVariants({ variant: variant(), size: size() }), local.class);
        },
      },
      props
    ),
    get render() {
      return !local.tooltip
        ? local.render ??
            ((props, state) => <button {...props} data-active={(state as any).active} />)
        : TooltipTrigger;
    },
    state: {
      slot: "sidebar-menu-button",
      sidebar: "menu-button",
      get size() {
        return size();
      },
      get active() {
        return isActive();
      },
    },
  });

  return (
    <Show when={local.tooltip} fallback={<>{comp()}</>}>
      <Tooltip>
        {comp()}
        <TooltipContent
          side="right"
          align="center"
          hidden={state() !== "collapsed" || isMobile()}
          {...(typeof local.tooltip === "string" ? { children: local.tooltip } : local.tooltip)}
        />
      </Tooltip>
    </Show>
  );
}

function SidebarMenuAction(
  props: useRender.ComponentProps<"button"> &
    ComponentProps<"button"> & {
      showOnHover?: boolean;
    }
) {
  const [local, rest] = splitProps(props, ["class", "render", "showOnHover"]);
  const showOnHover = () => local.showOnHover || false;
  const element = useRender({
    props: mergeProps<"button">(
      {
        get class() {
          return cn(
            "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 aspect-square w-5 rounded-[calc(var(--radius-sm)-2px)] p-0 peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 focus-visible:ring-2 [&>svg]:size-4 flex items-center justify-center outline-hidden transition-transform group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 md:after:hidden [&>svg]:shrink-0",
            showOnHover() &&
              "peer-data-active/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-open:opacity-100 md:opacity-0",
            local.class
          );
        },
      },
      rest
    ),
    get render() {
      return local.render ?? "button";
    },
    state: {
      slot: "sidebar-menu-action",
      sidebar: "menu-action",
    },
  });

  return <>{element()}</>;
}

function SidebarMenuBadge(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      class={cn(
        "text-sidebar-foreground peer-hover/menu-button:text-sidebar-accent-foreground peer-data-active/menu-button:text-sidebar-accent-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 rounded-[calc(var(--radius-sm)-2px)] px-1 text-xs font-medium peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 flex items-center justify-center tabular-nums select-none group-data-[collapsible=icon]:hidden",
        local.class
      )}
      {...rest}
    />
  );
}

function SidebarMenuSkeleton(
  props: ComponentProps<"div"> & {
    showIcon?: boolean;
  }
) {
  const [local, rest] = splitProps(props, ["class", "showIcon"]);
  const showIcon = () => local.showIcon || false;
  // Random width between 50 to 90%.
  const width = `${Math.floor(Math.random() * 40) + 50}%`;

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      class={cn("h-8 gap-2 rounded-md px-2 flex items-center", local.class)}
      {...rest}
    >
      {showIcon() && <Skeleton class="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        class="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={{
          "--skeleton-width": width,
        }}
      />
    </div>
  );
}

function SidebarMenuSub(props: ComponentProps<"ul">) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      class={cn(
        "border-sidebar-border mx-3.5 translate-x-px gap-1 border-l px-2.5 py-0.5 group-data-[collapsible=icon]:hidden flex min-w-0 flex-col",
        local.class
      )}
      {...rest}
    />
  );
}

function SidebarMenuSubItem(props: ComponentProps<"li">) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      class={cn("group/menu-sub-item relative", local.class)}
      {...rest}
    />
  );
}

function SidebarMenuSubButton(
  props: useRender.ComponentProps<"a"> &
    ComponentProps<"a"> & {
      size?: "sm" | "md";
      isActive?: boolean;
    }
) {
  const [local, rest] = splitProps(props, ["class", "render", "size", "isActive"]);
  const size = () => local.size || "md";
  const isActive = () => local.isActive || false;
  const element = useRender({
    props: mergeProps<"a">(
      {
        get class() {
          return cn(
            "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground h-7 gap-2 rounded-md px-2 focus-visible:ring-2 data-[size=md]:text-xs data-[size=sm]:text-xs [&>svg]:size-4 flex min-w-0 -translate-x-px items-center overflow-hidden outline-hidden group-data-[collapsible=icon]:hidden disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:shrink-0",
            local.class
          );
        },
      },
      rest
    ),
    get render() {
      return local.render ?? "a";
    },
    state: {
      slot: "sidebar-menu-sub-button",
      sidebar: "menu-sub-button",
      get size() {
        return size();
      },
      get active() {
        return isActive();
      },
    },
  });

  return <>{element()}</>;
}

function ToggleIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...props}
    >
      <path d="M17 12H3" />
      <path d="m11 18 6-6-6-6" />
      <path d="M21 5v14" />
    </svg>
  );
}

function useIsMobile(mobileBreakpoint: Accessor<number> | number = 768) {
  const [isMobile, setIsMobile] = createSignal<boolean>();
  const breakpoint = () =>
    typeof mobileBreakpoint === "function" ? mobileBreakpoint() : mobileBreakpoint;

  createEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint() - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < breakpoint());
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < breakpoint());
    onCleanup(() => mql.removeEventListener("change", onChange));
  });

  return () => !!isMobile();
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useIsMobile,
  useSidebar,
};
