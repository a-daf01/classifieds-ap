// frontend/components/forms/CarFields.tsx
import React from "react";
import type { BaseFieldsProps } from "./utils";
import { toOptions } from "./utils";

const TRANSMISSIONS = ["AUTOMATIC", "MANUAL", "SEMI_AUTO"] as const;
const FUEL_TYPES = ["PETROL", "DIESEL", "ELECTRIC", "HYBRID"] as const;
const BODY_STYLES = [
  "SEDAN",
  "SUV",
  "HATCHBACK",
  "COUPE",
  "CONVERTIBLE",
  "TRUCK",
] as const;
const DRIVETRAINS = ["FWD", "RWD", "AWD_4WD"] as const;
const CONDITIONS = ["NEW", "LIKE_NEW", "USED", "SALVAGE", "WORN"] as const;

export default function CarFields({ register }: BaseFieldsProps) {
  return (
    <fieldset className="space-y-2">
      <legend>Car Details</legend>

      <label>
        Transmission
        <select {...register("transmission")}>
          <option value="">Any</option>
          {toOptions(TRANSMISSIONS)}
        </select>
      </label>

      <label>
        Fuel Type
        <select {...register("fuelType")}>
          <option value="">Any</option>
          {toOptions(FUEL_TYPES)}
        </select>
      </label>

      <label>
        Body Style
        <select {...register("bodyStyle")}>
          <option value="">Any</option>
          {toOptions(BODY_STYLES)}
        </select>
      </label>

      <label>
        Drivetrain
        <select {...register("driveTrain")}>
          <option value="">Any</option>
          {toOptions(DRIVETRAINS)}
        </select>
      </label>

      <label>
        Condition
        <select {...register("condition")}>
          <option value="">Any</option>
          {toOptions(CONDITIONS)}
        </select>
      </label>

      <label>
        Mileage
        <input
          type="number"
          {...register("mileage", { valueAsNumber: true })}
        />
      </label>

      <label>
        Year
        <input type="number" {...register("year", { valueAsNumber: true })} />
      </label>

      <label>
        Color
        <input {...register("color")} />
      </label>
    </fieldset>
  );
}
