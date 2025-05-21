// frontend/components/forms/ProjectFields.tsx
import { BaseFieldsProps } from "./utils"

export default function ProjectFields({
  register,
}: BaseFieldsProps) {
  return (
    <fieldset className="space-y-2">
      <legend>Project Details</legend>

      <label>
        Min Budget
        <input
          type="number"
          {...register("salaryMin", { valueAsNumber: true })}
        />
      </label>

      <label>
        Max Budget
        <input
          type="number"
          {...register("salaryMax", { valueAsNumber: true })}
        />
      </label>

      <label>
        Deadline
        <input type="date" {...register("deadline")} />
      </label>

      <label>
        Specs
        <textarea {...register("projectSpecs")} rows={4} />
      </label>
    </fieldset>
  )
}
