// frontend/components/forms/GameFields.tsx
import React from "react";
import type { BaseFieldsProps } from "./utils";
import { toOptions } from "./utils";

const GENRES = ["ACTION", "ADVENTURE", "RPG", "PUZZLE", "SIMULATION"] as const;
const PLATFORMS = ["PC", "PS5", "XBOX", "SWITCH"] as const;

export default function GameFields({ register }: BaseFieldsProps) {
  return (
    <fieldset className="space-y-2">
      <legend>Game Details</legend>

      <label>
        Genre
        <select {...register("genre")}>
          <option value="">Any</option>
          {toOptions(GENRES)}
        </select>
      </label>

      <label>
        Platform
        <select {...register("platform")}>
          <option value="">Any</option>
          {toOptions(PLATFORMS)}
        </select>
      </label>
    </fieldset>
  );
}
