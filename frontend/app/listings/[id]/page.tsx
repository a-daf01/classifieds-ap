import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface Props {
  params: { id: string };
}

interface Image { url: string; }
interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  images?: Image[];
}

export default async function ListingPage({ params }: Props) {
  const { id } = params;
  const res = await fetch(`http://localhost:3001/listings/${id}`, {
    cache: 'no-store',
  });
  const listing: Listing = await res.json();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{listing.title}</h1>
      <Swiper spaceBetween={10} slidesPerView={1}>
        {listing.images?.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img src={img.url} alt={`Image ${idx + 1}`} className="w-full h-auto rounded" />
          </SwiperSlide>
        ))}
      </Swiper>
      <p className="text-gray-700">{listing.description}</p>
      <p className="font-bold">SAR {listing.price}</p>
    </div>
  );
}