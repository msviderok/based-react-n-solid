import { persistentAtom } from "@nanostores/persistent";
import { atom, computed } from "nanostores";

type SectionsState = Record<string, Section>;
interface Section {
  open: boolean;
  variants: string[];
}

export const COMPLIST: [string, string[]][] = [
  ["accordion", ["hero"]],
  ["alert-dialog", ["hero"]],
  ["avatar", ["hero"]],
  ["checkbox", ["hero"]],
  ["checkbox-group", ["hero", "parent", "nested", "form"]],
  ["collapsible", ["hero"]],
  ["context-menu", ["hero", "submenu"]],
  ["dialog", ["hero", "nested", "close-confirmation"]],
  ["field", ["hero"]],
  ["fieldset", ["hero"]],
  ["form", ["hero", "zod"]],
  ["input", ["hero"]],
  ["menu", ["hero", "checkbox-items", "group-labels", "open-on-hover", "radio-items", "submenu"]],
  ["menubar", ["hero"]],
  ["meter", ["hero"]],
  ["navigation-menu", ["hero", "nested"]],
  ["number-field", ["hero"]],
  ["popover", ["hero"]],
  ["preview-card", ["hero"]],
  ["progress", ["hero"]],
  ["radio", ["hero"]],
  ["scroll-area", ["hero"]],
  ["select", ["hero"]],
  ["separator", ["hero"]],
  ["slider", ["hero", "range-slider"]],
  ["switch", ["hero"]],
  ["tabs", ["hero"]],
  ["toast", ["hero", "custom", "position", "promise", "undo"]],
  ["toggle", ["hero"]],
  ["toggle-group", ["hero"]],
  ["toolbar", ["hero"]],
  ["tooltip", ["hero"]],
];

const initialSections: SectionsState = COMPLIST.reduce<SectionsState>(
  (acc, [compName, variants]) => {
    acc[compName] = { open: false, variants };
    return acc;
  },
  {}
);

export const styling = persistentAtom<"CssModules" | "Tailwind">("styling", "CssModules");
export const sections = persistentAtom<SectionsState>("sections", initialSections, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const sectionsArray = computed(sections, (sections) => Object.keys(sections));

export const openSections = computed(sections, (sections) =>
  Object.keys(sections).filter((item) => sections[item].open)
);
export const allSectionsOpen = computed(sections, (sections) =>
  Object.values(sections).every((item) => item.open)
);

export const toggleAllSections = () => {
  const newState = !allSectionsOpen.get();
  const newSections = Object.entries(sections.get()).reduce<SectionsState>((acc, [item, value]) => {
    acc[item] = { open: newState, variants: value.variants };
    return acc;
  }, {});
  sections.set(newSections);
};

export const toggleSection = (id: string) => {
  const s = sections.get()[id];
  const newState = !s.open;
  sections.set({ ...sections.get(), [id]: { open: newState, variants: s.variants } });
  return newState;
};
