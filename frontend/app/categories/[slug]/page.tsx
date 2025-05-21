'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useListingsByCategory } from '../../../hooks/useListingsByCategory';
import { ListingItem } from '../../../components/ListingItem';

type CategorySlug = 
  | 'cars' | 'furniture' 
  | 'jobs' | 'services' 
  | 'projects' | 'games' 
  | 'devices';

interface Props {
  params: { slug: CategorySlug };
}

export default function CategoryPage({ params }: Props) {
  const slug = params.slug;
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || undefined;

  const { data: listings = [], isLoading, error } =
    useListingsByCategory(slug, q);

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p className="text-red-600">Error: {error.message}</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold capitalize">{slug}</h1>
        <Link
          href={`/categories/${slug}/create`}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Create Listing
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((l) => (
          <ListingItem key={l.id} listing={l} />
        ))}
      </div>
    </div>
  );
}
