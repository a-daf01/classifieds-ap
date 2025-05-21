// frontend/app/page.tsx
"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import CarFields from "../components/forms/CarFields";
import ClothingFields from "../components/forms/ClothingFields";
import DeviceFields from "../components/forms/DeviceFields";
import FurnitureFields from "../components/forms/FurnitureFields";
import GameFields from "../components/forms/GameFields";
import JobFields from "../components/forms/JobFields";
import RecruitmentFields from "../components/forms/RecruitmentFields";
import ServiceFields from "../components/forms/ServiceFields";

type Category =
  | ""
  | "Car"
  | "Clothing"
  | "Device"
  | "Furniture"
  | "Game"
  | "Job"
  | "Recruitment"
  | "Service";

type FormValues = {
  category: Category;
  title: string;
  description: string;
  price: number;
  images: FileList;
  // plus all of your sub-form fields:
  transmission?: string;
  fuelType?: string;
  /* …etc… */
};

export default function Page() {
  const methods = useForm<FormValues>({ defaultValues: { category: "" } });
  const { handleSubmit, register, control, watch } = methods;

  const selectedCategory = watch("category");

  function onSubmit(vals: FormValues) {
    console.log("final payload:", vals);
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto p-4 space-y-6"
      >
        <h1 className="text-2xl font-bold">Create a Listing</h1>

        {/* Category selector */}
        <label className="block">
          Category
          <select
            {...register("category", { required: true })}
            className="mt-1 block w-full border rounded p-2"
          >
            <option value="">-- Select --</option>
            <option value="Car">Car</option>
            <option value="Clothing">Clothing</option>
            <option value="Device">Device</option>
            <option value="Furniture">Furniture</option>
            <option value="Game">Game</option>
            <option value="Job">Job</option>
            <option value="Recruitment">Recruitment</option>
            <option value="Service">Service</option>
          </select>
        </label>

        {/* Always-on fields */}
        <label className="block">
          Title
          <input
            {...register("title", { required: true })}
            className="mt-1 block w-full border rounded p-2"
          />
        </label>

        <label className="block">
          Description
          <textarea
            {...register("description")}
            className="mt-1 block w-full border rounded p-2"
            rows={4}
          />
        </label>

        <label className="block">
          Price
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            className="mt-1 block w-full border rounded p-2"
          />
        </label>

        <label className="block">
          Images
          <input
            type="file"
            {...register("images")}
            multiple
            className="mt-1 block w-full"
          />
        </label>

        {/* Conditionally render the right sub-form */}
        {selectedCategory === "Car" && (
          <CarFields register={register} control={control} />
        )}
        {selectedCategory === "Clothing" && (
          <ClothingFields register={register} />
        )}
        {selectedCategory === "Device" && (
          <DeviceFields register={register} />
        )}
        {selectedCategory === "Furniture" && (
          <FurnitureFields register={register} />
        )}
        {selectedCategory === "Game" && <GameFields register={register} />}
        {selectedCategory === "Job" && <JobFields register={register} />}
        {selectedCategory === "Recruitment" && (
          <RecruitmentFields register={register} />
        )}
        {selectedCategory === "Service" && (
          <ServiceFields register={register} />
        )}

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Create Listing
        </button>
      </form>
    </FormProvider>
  );
}
