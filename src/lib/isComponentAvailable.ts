import reactDemos from "@/components/react/demos";
import solidDemos from "@/components/solid/demos";

export function isComponentAvailable(
  component: string,
  variant: string,
  style: "CssModules" | "Tailwind"
): { react: boolean; solid: boolean } {
  const reactComp = (reactDemos as any)[component]?.[variant]?.[style];
  const solidComp = (solidDemos as any)[component]?.[variant]?.[style];

  return {
    react: !!reactComp,
    solid: !!solidComp,
  };
}
