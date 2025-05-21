import React, { FC, useState } from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export interface CarFilterOptions {
  yearRange: [number, number];
  mileageRange: [number, number];
}

interface Props {
  onApply: (filters: CarFilterOptions) => void;
}

export const CarsFilter: FC<Props> = ({ onApply }) => {
  const [yearRange, setYearRange] = useState<[number, number]>([2000, 2025]);
  const [mileageRange] = useState<[number, number]>([0, 200000]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Year</label>
        <Range
          min={1980}
          max={2025}
          value={yearRange}
          onChange={(v: number[]) => setYearRange(v as [number, number])}
        />
      </div>
      <button
        onClick={() => onApply({ yearRange, mileageRange })}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Apply Filters
      </button>
    </div>
  );
};