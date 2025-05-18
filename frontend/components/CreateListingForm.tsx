'use client';

import React, { useState, FormEvent } from 'react';
import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { Listing } from '../hooks/useListings';

interface ListingFormInput {
  title: string;
  description: string;
  price: number;
}

export function CreateListingForm(): React.ReactElement {
  const qc = useQueryClient();

  const mutation: UseMutationResult<Listing, Error, ListingFormInput> = useMutation({
    mutationFn: async (newListing) => {
      console.log('📝 submitting', newListing);
      const res = await fetch('http://localhost:3001/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newListing),
      });
      if (!res.ok) throw new Error('Failed to create listing');
      return (await res.json()) as Listing;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['listings'] });
    },
  });

  const [form, setForm] = useState<ListingFormInput>({
    title: '',
    description: '',
    price: 0,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-semibold">New Listing</h2>

      <div>
        <label className="block mb-1">Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          className="w-full border p-2 rounded focus:ring focus:ring-brand"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          className="w-full border p-2 rounded focus:ring focus:ring-brand"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Price (SAR)</label>
        <input
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm((f) => ({ ...f, price: parseFloat(e.target.value) || 0 }))
          }
          className="w-full border p-2 rounded focus:ring focus:ring-brand"
          required
          step="0.01"
        />
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {mutation.isPending ? 'Creating…' : 'Create Listing'}
      </button>

      {mutation.isError && <p className="text-red-600">Error: {mutation.error.message}</p>}
    </form>
  );
}
