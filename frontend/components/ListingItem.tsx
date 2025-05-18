'use client';

import React, { useState, FormEvent } from 'react';
import { Listing } from '../hooks/useListings';
import { useDeleteListing } from '../hooks/useDeleteListing';
import { useEditListing } from '../hooks/useEditListing';

interface ListingItemProps {
  listing: Listing;
}

export function ListingItem({ listing }: ListingItemProps) {
  const deleteMutation = useDeleteListing();
  const editMutation = useEditListing();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: listing.title,
    description: listing.description,
    price: listing.price,
  });

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    editMutation.mutate({ id: listing.id, data: form });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSave} className="border p-4 rounded bg-gray-50 space-y-2">
        <input
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          className="w-full border p-2 rounded"
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm((f) => ({ ...f, price: parseFloat(e.target.value) || 0 }))
          }
          className="w-full border p-2 rounded"
        />
        <div className="flex space-x-2">
          <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded">
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden relative">
      <div className="p-4">
        <h3 className="text-lg font-semibold">{listing.title}</h3>
        <p className="text-gray-600 truncate">{listing.description}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="font-bold">SAR {listing.price}</span>
          <div className="space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-2 py-1 bg-blue-600 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => deleteMutation.mutate(listing.id)}
              className="px-2 py-1 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
