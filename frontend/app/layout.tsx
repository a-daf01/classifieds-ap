'use client';

import './globals.css';
import React, { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Link from 'next/link';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <Link href="/">
            <span className="text-2xl font-bold text-brand cursor-pointer">
              Classifieds
            </span>
          </Link>
          <nav className="space-x-4">
            <Link href="/">Home</Link>
          </nav>
        </header>

        <QueryClientProvider client={queryClient}>
          <main className="container mx-auto mt-6">{children}</main>
        </QueryClientProvider>
      </body>
    </html>
  );
}
