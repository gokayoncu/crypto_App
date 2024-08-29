'use client'; 

import React from 'react';
import { Inter } from 'next/font/google';
import { CryptoProvider } from '@/app/context/context'; 
import { QueryClient, QueryClientProvider } from 'react-query';
import Navbar from '@/app/components/Navbar'
const inter = Inter({ subsets: ['latin'] });
const queryClient = new QueryClient();
import '@/app/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <CryptoProvider>
            <Navbar/>
            {children}
          </CryptoProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
