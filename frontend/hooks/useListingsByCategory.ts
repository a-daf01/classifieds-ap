import { useQuery } from '@tanstack/react-query';

export interface ListingByCategory {
  id: number;
  title: string;
  description: string;
  price: number;
  createdAt: string;
  images: { url: string }[];
}

export function useListingsByCategory(
  category: string,
  q?: string
) {
  return useQuery<ListingByCategory[], Error>({
    queryKey: ['listings', category, q],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('category', category);
      if (q) params.set('q', q);
      const res = await fetch(`/api/listings?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch listings');
      return (await res.json()) as ListingByCategory[];
    },
  });
}
