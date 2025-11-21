import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { UserProvider } from "@/context/UserContext";
import NavbarProvider from '@/components/NavbarProvider';
import { Providers } from './Providers';
import Script from "next/script";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hooblr.com"),
  title: 'Hooblr - Professional Job Board Platform',
  description: 'Find your dream job or hire top talent with Hooblr',
  verification: {
    google: "P8SyxngAQjuCxJyPsWuGEpLrEMghrPLPfMXyzTafqQA",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-HCXZVV15WV"
        />

        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HCXZVV15WV');
          `}
        </Script>
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