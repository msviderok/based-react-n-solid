/** @jsxImportSource solid-js */
import { COMPLIST } from "@/lib/store";
import { capitalize, cn } from "@/lib/utils";
import {
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  Show,
  type Accessor,
  type ParentProps,
} from "solid-js";
import { FrameworkSwitch } from "./FrameworkSwitch";
import { StyleSwitch } from "./StyleSwitch";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "./ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const CONTENTS = COMPLIST.map(([compName, variants]) => {
  return {
    id: compName,
    name: capitalize(compName),
    variants: variants.map((variant) => ({ id: variant, name: capitalize(variant) })),
  };
});

export default function LayoutSidebar(props: ParentProps) {
  const [activeId, setActiveId] = createSignal("");

  createEffect(() => {
    if (!activeId()) return;

    const item = document.querySelector(`[data-comp-id="${activeId()}"]`) as HTMLElement | null;
    const contentRoot = document.querySelector(
      '[data-slot="sidebar-content"]'
    ) as HTMLElement | null;
    if (!item || !contentRoot) return;

    // `SidebarContent` is a `ScrollArea` root; the *actual* scrolling element is its viewport.
    const scrollEl =
      (contentRoot.querySelector('[data-slot="scroll-area-viewport"]') as HTMLElement | null) ??
      contentRoot;

    // If the container isn't actually scrollable, nothing to do.
    if (scrollEl.scrollHeight <= scrollEl.clientHeight) return;

    const padding = 12;
    const containerRect = scrollEl.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    const above = itemRect.top < containerRect.top + padding;
    const below = itemRect.bottom > containerRect.bottom - padding;
    if (!above && !below) return;

    // itemOffsetTop: item's top relative to container scroll origin.
    const itemOffsetTop = itemRect.top - containerRect.top + scrollEl.scrollTop;

    let targetScrollTop = scrollEl.scrollTop;
    if (above) {
      targetScrollTop = itemOffsetTop - padding;
    } else if (below) {
      targetScrollTop = itemOffsetTop - scrollEl.clientHeight + item.offsetHeight + padding;
    }

    // Clamp to valid scroll range (fixes first/last items).
    const maxScrollTop = scrollEl.scrollHeight - scrollEl.clientHeight;
    targetScrollTop = Math.max(0, Math.min(targetScrollTop, maxScrollTop));

    scrollEl.scrollTo({ top: targetScrollTop, behavior: "smooth" });
  });

  onMount(() => {
    if (CONTENTS.length === 0) return;

    const latestById = new Map<string, IntersectionObserverEntry>();
    let raf = 0;

    const pickActiveFromViewport = () => {
      raf = 0;

      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const doc = document.documentElement;
      const nearTop = scrollY < 4;
      const nearBottom = window.innerHeight + scrollY >= doc.scrollHeight - 4;

      const firstId = CONTENTS[0]?.id;
      const lastId = CONTENTS[CONTENTS.length - 1]?.id;

      if (nearTop && firstId) {
        setActiveId((prev) => (prev === firstId ? prev : firstId));
        return;
      }
      if (nearBottom && lastId) {
        setActiveId((prev) => (prev === lastId ? prev : lastId));
        return;
      }

      // Prefer the most-visible intersecting section; tie-break by being closer to the top.
      let best: IntersectionObserverEntry | null = null;
      for (const entry of latestById.values()) {
        if (!entry.isIntersecting) continue;
        if (!best) {
          best = entry;
          continue;
        }
        if (entry.intersectionRatio > best.intersectionRatio) {
          best = entry;
          continue;
        }
        if (entry.intersectionRatio === best.intersectionRatio) {
          if (entry.boundingClientRect.top < best.boundingClientRect.top) {
            best = entry;
          }
        }
      }

      if (best) {
        const id = (best.target as HTMLElement).id;
        if (id) setActiveId((prev) => (prev === id ? prev : id));
        return;
      }

      // Fallback: pick the last section whose top has passed a reasonable offset.
      // This fixes the "first few / last few" when rootMargin/thresholds miss intersections.
      const offset = 120;
      let fallbackId = firstId ?? "";
      for (const { id } of CONTENTS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) fallbackId = id;
        else break;
      }
      if (fallbackId) setActiveId((prev) => (prev === fallbackId ? prev : fallbackId));
    };

    const schedulePick = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(pickActiveFromViewport);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          latestById.set((entry.target as HTMLElement).id, entry);
        });
        schedulePick();
      },
      {
        // Mark a section as "active" once it's meaningfully on screen, not just barely intersecting.
        rootMargin: "0px 0px -60% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    const observeElements = () => {
      CONTENTS.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      });
      // In case we're already scrolled when this mounts.
      schedulePick();
    };

    const timeoutId = window.setTimeout(observeElements, 100);

    window.addEventListener("scroll", schedulePick, { passive: true });
    window.addEventListener("resize", schedulePick);

    onCleanup(() => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", schedulePick);
      window.removeEventListener("resize", schedulePick);
      if (raf) window.cancelAnimationFrame(raf);
      observer.disconnect();
    });
  });

  return (
    <SidebarProvider class="flex-0">
      <Content activeId={activeId()} setActiveId={setActiveId} />
      <main class="bg-background flex w-full flex-col rounded-xl p-8 max-w-[900px] relative gap-10">
        <MobileSidebarToggle />
        {props.children}
      </main>
    </SidebarProvider>
  );
}

function Content(props: { activeId: string; setActiveId: (id: string) => void }) {
  const { isMobile } = useSidebar();

  return (
    <Sidebar
      collapsible={isMobile() ? "offExamples" : "none"}
      class={cn("border-x justify-center h-svh", !isMobile() && "sticky top-0")}
    >
      <SidebarHeader class="flex flex-col gap-4 border-b border-border p-4">
        <div>
          <h1 class="text-lg font-bold text-foreground">Base UI for Solid</h1>
          <h2 class="text-xs text-muted-foreground">Cross-Framework Showcase</h2>
        </div>
        <FrameworkSwitch />
        <StyleSwitch />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Components</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu
              data-mobile={isMobile() ? "true" : undefined}
              class={cn(isMobile() && "gap-1.5")}
            >
              {CONTENTS.map((component) => (
                <SidebarMenuItem data-comp-id={component.id}>
                  <SidebarMenuButton
                    isActive={props.activeId === component.id}
                    onClick={() => {
                      const element = document.getElementById(component.id);
                      if (element) {
                        const offset = 100;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;

                        window.scrollTo({
                          top: offsetPosition,
                          behavior: "instant",
                        });
                      }
                    }}
                    class={cn("justify-between", isMobile() && "text-sm h-10 py-2.5")}
                  >
                    <span class={cn("truncate font-semibold", isMobile() && "text-sm")}>
                      {component.name}
                    </span>

                    <Tooltip>
                      <TooltipTrigger
                        render={(props) => (
                          <Badge
                            {...props}
                            variant="outline"
                            class={cn("opacity-60 size-5 text-xs scale-80", props.class)}
                          >
                            {component.variants.length}
                          </Badge>
                        )}
                      />
                      <TooltipContent side="right" sideOffset={24}>
                        Includes {component.variants.length} variant
                        {component.variants.length !== 1 ? "s" : ""}
                      </TooltipContent>
                    </Tooltip>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter class="border-t border-border pt-4">
        <div class="flex flex-col text-sm gap-2">
          <p class="text-muted-foreground flex items-center">
            <Button variant="link" class="px-1 py-0 text-primary/70" size="sm">
              <a
                href="https://github.com/msviderok/base-ui"
                target="_blank"
                rel="noreferrer"
                class="flex items-center gap-1.5"
              >
                <GithubIcon />
                Base UI for Solid
              </a>
            </Button>
          </p>

          <p class="text-muted-foreground ">
            <span class="text-xs">Amateur-grade Base UI port for Solid JS created by</span>
            <Button variant="link" class="px-1 py-0 text-primary/70" size="sm">
              <a href="https://github.com/msviderok" target="_blank" rel="noreferrer">
                @msviderok
              </a>
            </Button>
          </p>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function MobileSidebarToggle() {
  const { isMobile, openMobile } = useSidebar();

  return (
    <Show when={isMobile() && !openMobile()}>
      <div class="fixed top-4 left-0 z-50 md:hidden">
        <SidebarTrigger class="rounded-none! rounded-r-md! bg-muted/80 backdrop-blur-sm border-r border-y border-border shadow-sm size-9 [&>svg]:size-4" />
      </div>
    </Show>
  );
}

function GithubIcon() {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      class="size-4 -ml-1 relative -top-px"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <title>GitHub</title>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}
