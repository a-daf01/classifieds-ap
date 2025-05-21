// frontend/components/forms/ServiceFields.tsx
import React from "react";
import type { BaseFieldsProps } from "./utils";
import { toOptions } from "./utils";

const CATEGORIES = ["CLEANING", "DELIVERY", "REPAIR", "CONSULTING"] as const;
const TYPES = ["HOURLY", "FLAT_RATE"] as const;

export default function ServiceFields({ register }: BaseFieldsProps) {
  return (
    <fieldset className="space-y-2">
      <legend>Service Details</legend>

      <label>
        Category
        <select {...register("category")}>
          <option value="">Any</option>
          {toOptions(CATEGORIES)}
        </select>
      </label>

      <label>
        Billing Type
        <select {...register("billingType")}>
          <option value="">Any</option>
          {toOptions(TYPES)}
        </select>
      </label>

      <label>
        Rate
        <input type="number" {...register("rate", { valueAsNumber: true })} />
      </label>
    </fieldset>
  );
}
