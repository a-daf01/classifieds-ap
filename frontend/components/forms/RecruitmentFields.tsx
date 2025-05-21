// frontend/components/forms/RecruitmentFields.tsx
import React from "react";
import type { BaseFieldsProps } from "./utils";
import { toOptions } from "./utils";

const STAGES = ["APPLIED", "INTERVIEW", "OFFER", "REJECTED"] as const;
const TYPES = ["INTERNAL", "EXTERNAL"] as const;

export default function RecruitmentFields({ register }: BaseFieldsProps) {
  return (
    <fieldset className="space-y-2">
      <legend>Recruitment Details</legend>

      <label>
        Stage
        <select {...register("stage")}>
          <option value="">Any</option>
          {toOptions(STAGES)}
        </select>
      </label>

      <label>
        Type
        <select {...register("recruitmentType")}>
          <option value="">Any</option>
          {toOptions(TYPES)}
        </select>
      </label>

      <label>
        Company
        <input {...register("company")} />
      </label>
    </fieldset>
  );
}
