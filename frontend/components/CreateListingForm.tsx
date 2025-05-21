'use client';

import React, { useState, FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface ListingFormInput {
  title: string;
  description: string;
  price: number;
}

interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
}

export function CreateListingForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<ListingFormInput>({
    title: '',
    description: '',
    price: 0,
  });
  const [files, setFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const createListingMutation = useMutation<Listing, Error, ListingFormInput>({
    mutationFn: async (newData) => {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to create listing');
      }
      return (await res.json()) as Listing;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const uploadImagesMutation = useMutation<
    void,
    Error,
    { listingId: number; files: File[] }
  >({
    mutationFn: async ({ listingId, files }) => {
      const formData = new FormData();
      files.forEach((file) => formData.append('images', file));
      const res = await fetch(`/api/listings/${listingId}/images`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to upload images');
      }
    },
    onSuccess: (_data, { listingId }) => {
      queryClient.invalidateQueries({ queryKey: ['listing', listingId] });
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      const newListing = await createListingMutation.mutateAsync(form);
      if (files.length > 0) {
        try {
          await uploadImagesMutation.mutateAsync({ listingId: newListing.id, files });
        } catch (upErr) {
          console.warn('Image upload failed, continuing', upErr);
        }
      }
      router.push(`/listings/${newListing.id}`);
    } catch (err) {
      if (err instanceof Error) setErrorMessage(err.message);
    }
  };

  const isSubmitting =
    createListingMutation.status === 'pending' ||
    uploadImagesMutation.status === 'pending';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">Title</label>
        <input
          id="title"
          type="text"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">Description</label>
        <textarea
          id="description"
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium">Price</label>
        <input
          id="price"
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm((f) => ({ ...f, price: parseFloat(e.target.value) || 0 }))
          }
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label htmlFor="images" className="block text-sm font-medium">Images</label>
        <input
          id="images"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
          className="block w-full"
        />
      </div>

      {errorMessage && <p className="text-red-600">{errorMessage}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting…' : 'Create Listing'}
      </button>
    </form>
  );
}
