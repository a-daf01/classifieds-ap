// frontend/hooks/useEditListing.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Listing } from './useListings';
import { UpdateListingDto } from '../types';

export function useEditListing() {
  const qc = useQueryClient();
  return useMutation<
    Listing,                             // returned data
    Error,                               // error type
    { id: number; data: UpdateListingDto }  // variables
  >({
    mutationFn: async ({ id, data }) => {
      const res = await fetch(`http://localhost:3001/listings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update');
      return (await res.json()) as Listing;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['listings'] });
    },
  });
}
