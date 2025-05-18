'use client';

import React from 'react';
import { CreateListingForm } from '../components/CreateListingForm';
import { ListingItem } from '../components/ListingItem';
import { useListings } from '../hooks/useListings';

export default function HomePage() {
  const { data: listings = [], isLoading, error } = useListings();

  return (
    <div className="space-y-8">
      {/* Create New Listing */}
      <div className="bg-white p-6 rounded-lg shadow">
        <CreateListingForm />
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow flex flex-col sm:flex-row gap-4">
        <input
          type="search"
          placeholder="Search listings…"
          className="flex-1 border rounded p-2"
        />
        <select className="border rounded p-2 bg-white">
          <option>All Categories</option>
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

      {/* Listings */}
      {isLoading && <p>Loading listings…</p>}
      {error && <p className="text-red-600">Error: {error.message}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((l) => (
          <ListingItem key={l.id} listing={l} />
        ))}
      </div>
    </div>
  );
}
