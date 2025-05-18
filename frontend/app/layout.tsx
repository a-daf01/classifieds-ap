'use client';

import './globals.css';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-brand">Classifieds</h1>
          <nav>
            <a href="/" className="px-3 py-1 hover:text-brand">Home</a>
            <a href="/about" className="px-3 py-1 hover:text-brand">About</a>
          </nav>
        </header>
        <QueryClientProvider client={queryClient}>
          <main className="container mx-auto mt-6">{children}</main>
        </QueryClientProvider>
      </body>
    </html>
  );
}
