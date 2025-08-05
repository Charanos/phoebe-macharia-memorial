import "./globals.css";
import type { Metadata } from "next";
import { Nunito, Montserrat } from "next/font/google";
import { ThemeProvider } from "../components/providers/ThemeProvider";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// Nunito for paragraphs and body text
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

// Montserrat for titles, buttons, and headings
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Phoebe Wangeci Macharia - Memorial Website",
  description:
    "A loving tribute to Phoebe Wangeci Macharia - celebrating her life, faith, and impact on our community.",
  keywords:
    "memorial, tribute, Phoebe Wangeci, PCEA Riruta Satellite, faith, community, legacy",
  authors: [{ name: "Family of Phoebe Wangeci" }],
  openGraph: {
    title: "Phoebe Wangeci Macharia Memorial",
    description: "Celebrating the life and legacy of Phoebe Wangeci Macharia",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phoebe Wangeci Macharia Memorial",
    description: "Celebrating the life and legacy of Phoebe Wangeci Macharia",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${nunito.variable} ${montserrat.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <div className="flex flex-col overflow-y-hidden overflow-x-hidden min-h-screen w-full">
            <Header />
            <main className="flex-1 w-full">
              <div className="w-full">{children}</div>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
