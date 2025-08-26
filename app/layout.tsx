// app/layout.tsx
import type { Metadata } from 'next'
import { ubuntu } from '@/lib/fonts' // Import the font
import './globals.css' // Import the Tailwind styles
import GoogleAnalytics from '@/components/utils/GoogleAnalytics';

export const metadata: Metadata = {
  title: 'Krishna Shukla - Portfolio', 
  description: 'My portfolio, running in a simulated Ubuntu OS.',
  icons: {
    icon: [
      { url: '/ubuntu.svg', sizes: '32x32', type: 'image/svg' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={ubuntu.className}>
      <body className="bg-window-bg text-text-light">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}