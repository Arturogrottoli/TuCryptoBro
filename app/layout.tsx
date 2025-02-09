import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tu Crypto Bro',
  description: 'Mirá el valor de tus cryptos en vivo!',
  icons: "/favicon.ico",
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
