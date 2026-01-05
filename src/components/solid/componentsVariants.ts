import components from "./components";
export const componentVariants = Object.entries(components).map(([k, v]) => [k, Object.keys(v)]);
