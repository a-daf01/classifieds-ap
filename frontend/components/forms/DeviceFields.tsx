// frontend/components/forms/DeviceFields.tsx
import React from "react";
import type { BaseFieldsProps } from "./utils";
import { toOptions } from "./utils";

const BRANDS = ["APPLE", "SAMSUNG", "MICROSOFT", "GOOGLE"] as const;
const TYPES = ["LAPTOP", "PHONE", "TABLET", "WATCH"] as const;

export default function DeviceFields({ register }: BaseFieldsProps) {
  return (
    <fieldset className="space-y-2">
      <legend>Device Details</legend>

      <label>
        Brand
        <select {...register("brand")}>
          <option value="">Any</option>
          {toOptions(BRANDS)}
        </select>
      </label>

      <label>
        Type
        <select {...register("deviceType")}>
          <option value="">Any</option>
          {toOptions(TYPES)}
        </select>
      </label>
    </fieldset>
  );
}
