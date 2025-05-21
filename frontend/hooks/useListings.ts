import { useQuery } from '@tanstack/react-query';

export interface ListingImage {
  id: number;
  url: string;
  createdAt: string;
}
export interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  createdAt: string;
  images: ListingImage[];
}

export function useListings() {
  return useQuery<Listing[], Error>({
    queryKey: ['listings'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/listings');
      if (!res.ok) throw new Error('Failed to fetch listings');
      return (await res.json()) as Listing[];
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
