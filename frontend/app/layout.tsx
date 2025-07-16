import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GLP-1 Opportunity Finder',
  description: 'Created with Extuitive',
  generator: 'extuitive',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
