import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Thiago Ibrahim | Software Developer",
    template: "%s | Thiago Ibrahim",
  },
  description:
    "Portfolio de Thiago Ibrahim - Software Developer focado em Backend, Full Stack e Inteligencia Artificial. Construindo solucoes modernas com programacao e IA.",
  keywords: [
    "Thiago Ibrahim",
    "Software Developer",
    "Backend Developer",
    "Full Stack",
    "Artificial Intelligence",
    "Java",
    "Python",
    "Portfolio",
  ],
  authors: [{ name: "Thiago Ibrahim Branco Nardo Vieira" }],
  creator: "Thiago Ibrahim",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://thiagoibrahim.dev",
    siteName: "Thiago Ibrahim - Portfolio",
    title: "Thiago Ibrahim | Software Developer",
    description:
      "Software Developer focado em Backend, Full Stack e Inteligencia Artificial.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Thiago Ibrahim - Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thiago Ibrahim | Software Developer",
    description:
      "Software Developer focado em Backend, Full Stack e Inteligencia Artificial.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://thiagoibrahim.dev" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Thiago Ibrahim Branco Nardo Vieira",
              jobTitle: "Software Developer",
              url: "https://thiagoibrahim.dev",
              sameAs: ["https://github.com/ThiagoIbrahimVieira"],
              knowsAbout: [
                "Software Development",
                "Backend Development",
                "Artificial Intelligence",
                "Java",
                "Python",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-bg-primary text-text-primary">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
