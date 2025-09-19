import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { UserProvider } from "@/context/UserContext";
import NavbarProvider from '@/components/NavbarProvider';
import { Providers } from './Providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hooblr - Professional Job Board Platform',
  description: 'Find your dream job or hire top talent with Hooblr',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        <UserProvider>
        <NavbarProvider>
        {children}
        </NavbarProvider>
        </UserProvider>
        </Providers>
        </body>
    </html>
  )
}