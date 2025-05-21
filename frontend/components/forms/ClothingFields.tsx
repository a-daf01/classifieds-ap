// frontend/components/forms/ClothingFields.tsx
import React from "react";
import type { BaseFieldsProps } from "./utils";
import { toOptions } from "./utils";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
const TYPES = ["SHIRT", "PANTS", "DRESS", "JACKET", "SHOES"] as const;

export default function ClothingFields({ register }: BaseFieldsProps) {
  return (
    <fieldset className="space-y-2">
      <legend>Clothing Details</legend>

      <label>
        Size
        <select {...register("size")}>
          <option value="">Any</option>
          {toOptions(SIZES)}
        </select>
      </label>

      <label>
        Type
        <select {...register("type")}>
          <option value="">Any</option>
          {toOptions(TYPES)}
        </select>
      </label>

      <label>
        Brand
        <input {...register("brand")} />
      </label>
    </fieldset>
  );
}
