// app/layout.tsx
import type { Metadata } from 'next'
import { ubuntu } from '@/lib/fonts' // Import the font
import './globals.css' // Import the Tailwind styles

export const metadata: Metadata = {
  title: 'Your Name - Portfolio',
  description: 'My portfolio, running in a simulated Ubuntu OS.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={ubuntu.className}>
      <body className="bg-window-bg text-text-light">{children}</body>
    </html>
  )
}