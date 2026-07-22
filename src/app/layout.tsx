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
  metadataBase: new URL('https://thiagoibrahim.dev'),
  title: {
    default: "Thiago Ibrahim | Software Developer",
    template: "%s | Thiago Ibrahim",
  },
  description:
    "Portfólio de Thiago Ibrahim — Software Developer focado em Backend, Full Stack e Inteligência Artificial. Construindo soluções modernas com programação e IA.",
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
      "Software Developer focado em Backend, Full Stack e Inteligência Artificial.",
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
      "Software Developer focado em Backend, Full Stack e Inteligência Artificial.",
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
        <link rel="preconnect" href="https://api.github.com" />
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
      <body className="min-h-screen flex flex-col bg-bg-primary text-text-primary noise-overlay">
        <div className="fixed inset-0 grid-pattern pointer-events-none" aria-hidden="true" />
        <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-accent/[0.02] rounded-full blur-3xl" />
          <div className="absolute -bottom-40 right-1/4 w-[400px] h-[400px] bg-accent/[0.025] rounded-full blur-3xl" />
        </div>
        <LanguageProvider>
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
