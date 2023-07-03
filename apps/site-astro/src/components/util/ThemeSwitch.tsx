import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export function ThemeSwitch() {
  const [checked, setChecked] = useState<boolean>(false);

  function onChange(checked: boolean) {
    setChecked(checked);
  }
  return <Switch checked={checked} onCheckedChange={onChange} />;
}
