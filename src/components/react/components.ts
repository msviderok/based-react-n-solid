import * as AccordionHero from "./demos/accordion/hero";
import * as AlertDialogHero from "./demos/alert-dialog/hero";
import * as AvatarHero from "./demos/avatar/hero";
import * as CheckboxGroupForm from "./demos/checkbox-group/form";
import * as CheckboxGroupHero from "./demos/checkbox-group/hero";
import * as CheckboxGroupNested from "./demos/checkbox-group/nested";
import * as CheckboxGroupParent from "./demos/checkbox-group/parent";
import * as CheckboxHero from "./demos/checkbox/hero";
import * as CollapsibleHero from "./demos/collapsible/hero";
import * as ContextMenuHero from "./demos/context-menu/hero";
import * as ContextMenuSubmenu from "./demos/context-menu/submenu";
import * as DialogCloseConfirmation from "./demos/dialog/close-confirmation";
import * as DialogHero from "./demos/dialog/hero";
import * as DialogNested from "./demos/dialog/nested";
import * as FieldHero from "./demos/field/hero";
import * as FieldsetHero from "./demos/fieldset/hero";
import * as FormHero from "./demos/form/hero";
import * as FormZod from "./demos/form/zod";
import * as InputHero from "./demos/input/hero";
import * as MenuCheckboxItems from "./demos/menu/checkbox-items";
import * as MenuGroupLabels from "./demos/menu/group-labels";
import * as MenuHero from "./demos/menu/hero";
import * as MenuOpenOnHover from "./demos/menu/open-on-hover";
import * as MenuRadioItems from "./demos/menu/radio-items";
import * as MenuSubmenu from "./demos/menu/submenu";
import * as MenubarHero from "./demos/menubar/hero";
import * as MeterHero from "./demos/meter/hero";
import * as NavigationMenuHero from "./demos/navigation-menu/hero";
import * as NavigationMenuNested from "./demos/navigation-menu/nested";
import * as NumberFieldHero from "./demos/number-field/hero";
import * as PopoverHero from "./demos/popover/hero";
import * as PreviewCardHero from "./demos/preview-card/hero";
import * as ProgressHero from "./demos/progress/hero";
import * as RadioHero from "./demos/radio/hero";
import * as ScrollAreaHero from "./demos/scroll-area/hero";
import * as SelectHero from "./demos/select/hero";
import * as SeparatorHero from "./demos/separator/hero";
import * as SliderHero from "./demos/slider/hero";
import * as SliderRangeSlider from "./demos/slider/range-slider";
import * as SwitchHero from "./demos/switch/hero";
import * as TabsHero from "./demos/tabs/hero";
import * as ToastCustom from "./demos/toast/custom";
import * as ToastHero from "./demos/toast/hero";
import * as ToastPosition from "./demos/toast/position";
import * as ToastPromise from "./demos/toast/promise";
import * as ToastUndo from "./demos/toast/undo";
import * as ToggleGroupHero from "./demos/toggle-group/hero";
import * as ToggleHero from "./demos/toggle/hero";
import * as ToolbarHero from "./demos/toolbar/hero";
import * as TooltipHero from "./demos/tooltip/hero";

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
