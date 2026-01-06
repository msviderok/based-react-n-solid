import { persistentAtom } from "@nanostores/persistent";

export const layoutMode = persistentAtom<"grid" | "list">("layout-mode", "grid");

