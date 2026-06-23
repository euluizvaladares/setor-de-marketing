import type { Metadata } from 'next'
import { Cormorant_Garamond, Syne, DM_Sans, Bebas_Neue } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm',
  display: 'swap',
})

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
  display: 'swap',
})

const BASE_URL = 'https://www.setordemarketing.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Setor de Marketing — Continuar sendo visto como menos do que você é custa caro.',
  description:
    'Fechamos o abismo entre o que o seu negócio é e o que o mundo enxerga nele. Sites, identidade visual e soluções sob medida em Itamarandiba-MG.',
  keywords: 'agência de marketing, criação de sites, identidade visual, Itamarandiba, Minas Gerais',
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: 'Setor de Marketing',
    title: 'Setor de Marketing — Continuar sendo visto como menos do que você é custa caro.',
    description:
      'Fechamos o abismo entre o que o seu negócio é e o que o mundo enxerga nele. Sites, identidade visual e soluções sob medida.',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Setor de Marketing — Continuar sendo visto como menos do que você é custa caro.',
    description:
      'Fechamos o abismo entre o que o seu negócio é e o que o mundo enxerga nele. Sites, identidade visual e soluções sob medida.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${syne.variable} ${dmSans.variable} ${bebas.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
