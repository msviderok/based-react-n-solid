import { atom, computed } from "nanostores";

type SectionsState = Record<string, Section>;
interface Section {
  open: boolean;
}

const initialSections = await getInitialSections();

export const styling = atom<"css-modules" | "tailwind">("css-modules");
export const sections = atom(initialSections);

export const allSectionsOpen = computed(sections, (sections) =>
  Object.values(sections).every((item) => item.open)
);

export const toggleAllSections = () => {
  const newState = !allSectionsOpen.get();
  const newSections = Object.keys(sections.get()).reduce<SectionsState>((acc, item) => {
    acc[item] = { open: newState };
    return acc;
  }, {});
  sections.set(newSections);
};

export const toggleSection = (id: string) => {
  const newState = !sections.get()[id].open;
  sections.set({ ...sections.get(), [id]: { open: newState } });
};

async function getInitialSections() {
  const data = await fetch("/complist.json").then((res) => res.json() as Promise<string[]>);
  return data.reduce<SectionsState>((acc, item) => {
    acc[item] = {
      open: false,
    };
    return acc;
  }, {});
}
