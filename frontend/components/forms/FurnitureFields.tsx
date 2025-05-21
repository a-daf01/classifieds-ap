// frontend/components/forms/FurnitureFields.tsx
import React from "react";
import type { BaseFieldsProps } from "./utils";
import { toOptions } from "./utils";

const CATEGORIES = ["TABLE", "CHAIR", "BED", "SOFA", "DESK"] as const;
const MATERIALS = ["WOOD", "METAL", "PLASTIC", "GLASS"] as const;
const STYLES = ["MODERN", "VINTAGE", "INDUSTRIAL", "SCANDINAVIAN"] as const;

export default function FurnitureFields({ register }: BaseFieldsProps) {
  return (
    <fieldset className="space-y-2">
      <legend>Furniture Details</legend>

      <label>
        Category
        <select {...register("category")}>
          <option value="">Any</option>
          {toOptions(CATEGORIES)}
        </select>
      </label>

      <label>
        Material
        <select {...register("material")}>
          <option value="">Any</option>
          {toOptions(MATERIALS)}
        </select>
      </label>

      <label>
        Style
        <select {...register("style")}>
          <option value="">Any</option>
          {toOptions(STYLES)}
        </select>
      </label>

      <label>
        Color
        <input {...register("color")} />
      </label>
    </fieldset>
  );
}
