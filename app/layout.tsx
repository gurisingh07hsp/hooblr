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
  title: 'Find Top Jobs in India – Apply Now',
  description: 'Discover the latest jobs in India on Hooblr. Browse roles, compare companies, and apply instantly to fast-track your career growth.',
  verification: {
    google: "P8SyxngAQjuCxJyPsWuGEpLrEMghrPLPfMXyzTafqQA",
  },
  alternates: {
    canonical: "/",
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
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2777415313418867"
          crossOrigin="anonymous"></Script>
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