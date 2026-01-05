import { persistentAtom } from "@nanostores/persistent";
import { atom, computed } from "nanostores";

type SectionsState = Record<string, Section>;
interface Section {
  open: boolean;
  variants: string[];
}

export async function fetchComplist() {
  return fetch(`./complist.json`).then((res) => res.json() as Promise<[string, string[]][]>);
}

async function getInitialSections() {
  const complist = await fetchComplist();
  return complist.reduce<SectionsState>((acc, [compName, variants]) => {
    acc[compName] = { open: false, variants };
    return acc;
  }, {});
}

const initialSections = await getInitialSections();

export const styling = persistentAtom<"CssModules" | "Tailwind">("styling", "CssModules");
export const sections = persistentAtom("sections", initialSections, {
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
