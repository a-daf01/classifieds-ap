// frontend/app/page.tsx
'use client';

import React, { useState } from 'react';
import { useListings, Listing } from '../hooks/useListings';
import { CreateListingForm } from '../components/CreateListingForm';
import { useDeleteListing } from '../hooks/useDeleteListing';
import { useEditListing } from '../hooks/useEditListing';

function ListingItem({ listing }: { listing: Listing }) {
  const deleteMutation = useDeleteListing();
  const editMutation = useEditListing();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: listing.title,
    description: listing.description,
    price: listing.price,
  });

  // Edit mode
  if (isEditing) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editMutation.mutate({ id: listing.id, data: form });
          setIsEditing(false);
        }}
        className="border p-4 rounded bg-gray-50 space-y-2"
      >
        <input
          value={form.title}
          onChange={(e) =>
            setForm((f) => ({ ...f, title: e.target.value }))
          }
          className="w-full border p-2 rounded"
        />
        <textarea
          value={form.description}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              price: parseFloat(e.target.value) || 0,
            }))
          }
          className="w-full border p-2 rounded"
        />
        <div className="flex space-x-2">
          <button
            type="submit"
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
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

  // Display mode
  return (
    <div className="border p-4 rounded relative bg-white">
      <h2 className="text-xl font-semibold">{listing.title}</h2>
      <p>{listing.description}</p>
      <p className="font-medium">SAR {listing.price}</p>
      <small className="text-gray-500 block mb-2">
        Posted on {new Date(listing.createdAt).toLocaleDateString()}
      </small>
      <div className="absolute top-2 right-2 flex space-x-2">
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
  );
}

export default function HomePage(): React.ReactElement {
  const { data: listings = [], isLoading, error } = useListings();

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Listings</h1>

      <CreateListingForm />
      
      <h2 className="text-xl font-semibold">Search Listings</h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-white rounded shadow">
        <input
          type="search"
          placeholder="Search listings…"
          className="flex-1 border rounded p-2"
        />
        <select className="border rounded p-2 bg-white">
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Furniture</option>
        </select>
        <input
          type="number"
          placeholder="Min Price"
          className="w-24 border rounded p-2"
        />
        <input
          type="number"
          placeholder="Max Price"
          className="w-24 border rounded p-2"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map(listing => (
          <ListingItem key={listing.id} listing={listing} />
        ))}
      </div>


      

      {isLoading && <p>Loading listings…</p>}
      {error && <p className="text-red-600">Error: {error.message}</p>}

      <div className="space-y-4">
        {listings.map((listing) => (
          <ListingItem key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
