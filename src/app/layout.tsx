import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Would You Rather - Eğlenceli Seçim Oyunu',
  description: 'İki seçenek arasında tercih yapın, diğer kullanıcıların seçimlerini görün ve eğlenceli bir deneyim yaşayın!',
  keywords: 'would you rather, hangisini tercih edersin, seçim oyunu, online oyun, eğlenceli oyun',
  authors: [{ name: 'Yiğit Atakan' }],
  openGraph: {
    title: 'Would You Rather - Eğlenceli Seçim Oyunu',
    description: 'İki seçenek arasında tercih yapın, diğer kullanıcıların seçimlerini görün ve eğlenceli bir deneyim yaşayın!',
    url: 'https://would-you-rather-tr.vercel.app',
    siteName: 'Would You Rather TR',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Would You Rather TR',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Would You Rather - Eğlenceli Seçim Oyunu',
    description: 'İki seçenek arasında tercih yapın, diğer kullanıcıların seçimlerini görün ve eğlenceli bir deneyim yaşayın!',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SH4ZE3V1RB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SH4ZE3V1RB');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning={true} className={inter.className}>
        {children}
      </body>
    </html>
  )
}
