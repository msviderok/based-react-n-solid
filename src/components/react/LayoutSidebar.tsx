import { StyleSwitch } from "@/components/react/StyleSwitch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { COMPLIST } from "@/lib/store";
import { capitalize, cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const CONTENTS = COMPLIST.map(([compName, variants]) => {
  return {
    id: compName,
    name: capitalize(compName),
    variants: variants.map((variant) => ({ id: variant, name: capitalize(variant) })),
  };
});

export function LayoutSidebar({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    const observeElements = () => {
      CONTENTS.forEach((component) => {
        const element = document.getElementById(component.id);
        if (element) {
          observer.observe(element);
        }
      });
    };

    const timeoutId = setTimeout(observeElements, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return (
    <SidebarProvider className="flex-0">
      <Content activeId={activeId} setActiveId={setActiveId} />
      <main className="bg-background flex w-full flex-col rounded-xl p-8 max-w-[900px]">
        {children}
      </main>
    </SidebarProvider>
  );
}

function Content({
  activeId,
  setActiveId,
}: {
  activeId: string;
  setActiveId: (id: string) => void;
}) {
  const { isMobile } = useSidebar();

  return (
    <Sidebar
      collapsible={isMobile ? "offExamples" : "none"}
      className={cn("border-x justify-center h-svh", !isMobile && "sticky top-0")}
    >
      <SidebarHeader className="flex flex-col gap-4 border-b border-border p-4">
        <div>
          <h1 className="text-lg font-bold text-foreground">Base UI for Solid</h1>
          <h2 className="text-xs text-muted-foreground">Cross-Framework Showcase</h2>
        </div>
        <StyleSwitch />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Components</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {CONTENTS.map((component) => (
                <SidebarMenuItem key={component.id}>
                  <SidebarMenuButton
                    isActive={activeId === component.id}
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
                    className="justify-between"
                  >
                    <span className="truncate font-semibold">{component.name}</span>

                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <Badge variant="outline" className="opacity-60 size-5 text-xs scale-80">
                            {component.variants.length}
                          </Badge>
                        }
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

      <SidebarFooter className="border-t border-border pt-4">
        <div className="flex flex-col text-sm gap-2">
          <p className="text-muted-foreground flex items-center">
            <Button variant="link" className="px-1 py-0 text-primary/70" size="sm">
              <a
                href="https://github.com/msviderok/base-ui"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5"
              >
                <GithubIcon />
                Base UI for Solid
              </a>
            </Button>
          </p>

          <p className="text-muted-foreground ">
            <span className="text-xs">Amateur-grade Base UI port for Solid JS created by</span>
            <Button variant="link" className="px-1 py-0 text-primary/70" size="sm">
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

function GithubIcon() {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className="size-4 -ml-1 relative -top-px"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <title>GitHub</title>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}
