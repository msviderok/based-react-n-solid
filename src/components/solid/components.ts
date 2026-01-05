import type { Component } from "solid-js";
import * as AccordionHero from "./accordion/demos/hero";
import * as AlertDialogHero from "./alert-dialog/demos/hero";
import * as AvatarHero from "./avatar/demos/hero";
import * as CheckboxGroupForm from "./checkbox-group/demos/form";
import * as CheckboxGroupHero from "./checkbox-group/demos/hero";
import * as CheckboxGroupNested from "./checkbox-group/demos/nested";
import * as CheckboxGroupParent from "./checkbox-group/demos/parent";
import * as CheckboxHero from "./checkbox/demos/hero";
import * as CollapsibleHero from "./collapsible/demos/hero";
import * as ContextMenuHero from "./context-menu/demos/hero";
import * as ContextMenuSubmenu from "./context-menu/demos/submenu";
import * as DialogCloseConfirmation from "./dialog/demos/close-confirmation";
import * as DialogHero from "./dialog/demos/hero";
import * as DialogNested from "./dialog/demos/nested";
import * as FieldHero from "./field/demos/hero";
import * as FieldsetHero from "./fieldset/demos/hero";
import * as FormHero from "./form/demos/hero";
import * as FormZod from "./form/demos/zod";
import * as InputHero from "./input/demos/hero";
import * as MenuCheckboxItems from "./menu/demos/checkbox-items";
import * as MenuGroupLabels from "./menu/demos/group-labels";
import * as MenuHero from "./menu/demos/hero";
import * as MenuOpenOnHover from "./menu/demos/open-on-hover";
import * as MenuRadioItems from "./menu/demos/radio-items";
import * as MenuSubmenu from "./menu/demos/submenu";
import * as MenubarHero from "./menubar/demos/hero";
import * as MeterHero from "./meter/demos/hero";
import * as NavigationMenuHero from "./navigation-menu/demos/hero";
import * as NavigationMenuNested from "./navigation-menu/demos/nested";
import * as NumberFieldHero from "./number-field/demos/hero";
import * as PopoverHero from "./popover/demos/hero";
import * as PreviewCardHero from "./preview-card/demos/hero";
import * as ProgressHero from "./progress/demos/hero";
import * as RadioHero from "./radio/demos/hero";
import * as ScrollAreaHero from "./scroll-area/demos/hero";
import * as SelectHero from "./select/demos/hero";
import * as SeparatorHero from "./separator/demos/hero";
import * as SliderHero from "./slider/demos/hero";
import * as SliderRangeSlider from "./slider/demos/range-slider";
import * as SwitchHero from "./switch/demos/hero";
import * as TabsHero from "./tabs/demos/hero";
import * as ToastCustom from "./toast/demos/custom";
import * as ToastHero from "./toast/demos/hero";
import * as ToastPosition from "./toast/demos/position";
import * as ToastPromise from "./toast/demos/promise";
import * as ToastUndo from "./toast/demos/undo";
import * as ToggleGroupHero from "./toggle-group/demos/hero";
import * as ToggleHero from "./toggle/demos/hero";
import * as ToolbarHero from "./toolbar/demos/hero";
import * as TooltipHero from "./tooltip/demos/hero";

export default {
  accordion: {
    hero: AccordionHero,
  },
  "alert-dialog": {
    hero: AlertDialogHero,
  },
  avatar: {
    hero: AvatarHero,
  },
  checkbox: {
    hero: CheckboxHero,
  },
  "checkbox-group": {
    hero: CheckboxGroupHero,
    parent: CheckboxGroupParent,
    nested: CheckboxGroupNested,
    form: CheckboxGroupForm,
  },
  collapsible: {
    hero: CollapsibleHero,
  },
  "context-menu": {
    hero: ContextMenuHero,
    submenu: ContextMenuSubmenu,
  },
  dialog: {
    hero: DialogHero,
    nested: DialogNested,
    "close-confirmation": DialogCloseConfirmation,
  },
  field: {
    hero: FieldHero,
  },
  fieldset: {
    hero: FieldsetHero,
  },
  form: {
    hero: FormHero,
    zod: FormZod,
  },
  input: {
    hero: InputHero,
  },
  menu: {
    hero: MenuHero,
    "checkbox-items": MenuCheckboxItems,
    "group-labels": MenuGroupLabels,
    "open-on-hover": MenuOpenOnHover,
    "radio-items": MenuRadioItems,
    submenu: MenuSubmenu,
  },
  menubar: {
    hero: MenubarHero,
  },
  meter: {
    hero: MeterHero,
  },
  "navigation-menu": {
    hero: NavigationMenuHero,
    nested: NavigationMenuNested,
  },
  "number-field": {
    hero: NumberFieldHero,
  },
  popover: {
    hero: PopoverHero,
  },
  "preview-card": {
    hero: PreviewCardHero,
  },
  progress: {
    hero: ProgressHero,
  },
  radio: {
    hero: RadioHero,
  },
  "scroll-area": {
    hero: ScrollAreaHero,
  },
  select: {
    hero: SelectHero,
  },
  separator: {
    hero: SeparatorHero,
  },
  slider: {
    hero: SliderHero,
    "range-slider": SliderRangeSlider,
  },
  switch: {
    hero: SwitchHero,
  },
  tabs: {
    hero: TabsHero,
  },
  toast: {
    hero: ToastHero,
    custom: ToastCustom,
    position: ToastPosition,
    promise: ToastPromise,
    undo: ToastUndo,
  },
  toggle: {
    hero: ToggleHero,
  },
  "toggle-group": {
    hero: ToggleGroupHero,
  },
  toolbar: {
    hero: ToolbarHero,
  },
  tooltip: {
    hero: TooltipHero,
  },
};
