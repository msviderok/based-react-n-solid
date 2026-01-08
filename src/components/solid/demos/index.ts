/** @jsxImportSource solid-js */
import * as AccordionHero from "./accordion/hero";
import * as AlertDialogHero from "./alert-dialog/hero";
import * as AvatarHero from "./avatar/hero";
import * as CheckboxGroupForm from "./checkbox-group/form";
import * as CheckboxGroupHero from "./checkbox-group/hero";
import * as CheckboxGroupNested from "./checkbox-group/nested";
import * as CheckboxGroupParent from "./checkbox-group/parent";
import * as CheckboxHero from "./checkbox/hero";
import * as CollapsibleHero from "./collapsible/hero";
import * as ContextMenuHero from "./context-menu/hero";
import * as ContextMenuSubmenu from "./context-menu/submenu";
import * as DialogCloseConfirmation from "./dialog/close-confirmation";
import * as DialogHero from "./dialog/hero";
import * as DialogNested from "./dialog/nested";
import * as FieldHero from "./field/hero";
import * as FieldsetHero from "./fieldset/hero";
import * as FormHero from "./form/hero";
import * as FormZod from "./form/zod";
import * as InputHero from "./input/hero";
import * as MenuCheckboxItems from "./menu/checkbox-items";
import * as MenuGroupLabels from "./menu/group-labels";
import * as MenuHero from "./menu/hero";
import * as MenuOpenOnHover from "./menu/open-on-hover";
import * as MenuRadioItems from "./menu/radio-items";
import * as MenuSubmenu from "./menu/submenu";
import * as MenubarHero from "./menubar/hero";
import * as MeterHero from "./meter/hero";
import * as NavigationMenuHero from "./navigation-menu/hero";
import * as NavigationMenuNested from "./navigation-menu/nested";
import * as NumberFieldHero from "./number-field/hero";
import * as PopoverHero from "./popover/hero";
import * as PreviewCardHero from "./preview-card/hero";
import * as ProgressHero from "./progress/hero";
import * as RadioHero from "./radio/hero";
import * as ScrollAreaHero from "./scroll-area/hero";
import * as SelectHero from "./select/hero";
import * as SeparatorHero from "./separator/hero";
import * as SliderHero from "./slider/hero";
import * as SliderRangeSlider from "./slider/range-slider";
import * as SwitchHero from "./switch/hero";
import * as TabsHero from "./tabs/hero";
import * as ToastCustom from "./toast/custom";
import * as ToastHero from "./toast/hero";
import * as ToastPosition from "./toast/position";
import * as ToastPromise from "./toast/promise";
import * as ToastUndo from "./toast/undo";
import * as ToggleGroupHero from "./toggle-group/hero";
import * as ToggleHero from "./toggle/hero";
import * as ToolbarHero from "./toolbar/hero";
import * as TooltipHero from "./tooltip/hero";

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
