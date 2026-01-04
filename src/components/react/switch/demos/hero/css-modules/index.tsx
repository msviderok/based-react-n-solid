/** @jsxImportSource react */
import { Switch } from "@msviderok/base-ui-react/switch";
import * as React from "react";
import styles from "./index.module.css";

export default function ExampleSwitch() {
  return (
    <Switch.Root defaultChecked className={styles.Switch}>
      <Switch.Thumb className={styles.Thumb} />
    </Switch.Root>
  );
}
