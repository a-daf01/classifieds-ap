// frontend/hooks/useListings.ts
import { useQuery } from '@tanstack/react-query';

export interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  createdAt: string;
  imageUrl?: string; 
}

export function useListings() {
  return useQuery<Listing[], Error>({
    queryKey: ['listings'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/listings');
      if (!res.ok) throw new Error('Failed to fetch listings');
      return (await res.json()) as Listing[];
    },
  });
}
