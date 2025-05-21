// frontend/components/forms/JobFields.tsx
import React from "react";
import type { BaseFieldsProps } from "./utils";
import { toOptions } from "./utils";

const TYPES = ["FULL_TIME", "PART_TIME", "CONTRACT", "TEMPORARY"] as const;
const SENIORITY = ["JUNIOR", "MID", "SENIOR", "LEAD"] as const;

export default function JobFields({ register }: BaseFieldsProps) {
  return (
    <fieldset className="space-y-2">
      <legend>Job Details</legend>

      <label>
        Type
        <select {...register("jobType")}>
          <option value="">Any</option>
          {toOptions(TYPES)}
        </select>
      </label>

      <label>
        Seniority
        <select {...register("seniority")}>
          <option value="">Any</option>
          {toOptions(SENIORITY)}
        </select>
      </label>

      <label>
        Company
        <input {...register("company")} />
      </label>

      <label>
        Salary
        <input type="number" {...register("salary", { valueAsNumber: true })} />
      </label>
    </fieldset>
  );
}
