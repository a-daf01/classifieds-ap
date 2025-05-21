// frontend/components/forms/utils.tsx
import type { UseFormRegister, Control } from "react-hook-form";
import React from "react";

// Turn a readonly string tuple into <option>…</option>
export function toOptions<V extends string>(
  items: readonly V[]
): React.JSX.Element[] {
  return items.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));
}

// Shared props for any of your “Fields” components
export interface BaseFieldsProps {
  register: UseFormRegister<any>;
  // Only needed if you use <Controller>; otherwise omit
  control?: Control<any>;
}
