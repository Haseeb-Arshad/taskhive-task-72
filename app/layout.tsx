import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.startsWith("http")
    ? process.env.NEXT_PUBLIC_SITE_URL
    : "https://sales-marketing-network.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sales Marketing Network",
    template: "%s • Sales Marketing Network",
  },
  description:
    "Collaborative sales workspace for team pipeline execution, lead management, and real-time analytics.",
  applicationName: "Sales Marketing Network",
  keywords: [
    "sales",
    "marketing",
    "CRM",
    "pipeline tracking",
    "team analytics",
    "dashboard",
  ],
  authors: [{ name: "Sales Marketing Network Team" }],
  creator: "Sales Marketing Network",
  publisher: "Sales Marketing Network",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Sales Marketing Network",
    description:
      "Drive team revenue with shared pipeline management, live collaboration, and performance intelligence.",
    siteName: "Sales Marketing Network",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sales Marketing Network",
    description:
      "A production-ready collaboration and analytics foundation for modern sales teams.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>

        <div className="app-shell">
          <header className="app-header">
            <div className="container app-header-inner">
              <Link className="brand" href="/" aria-label="Go to homepage">
                <span className="brand-mark" aria-hidden="true">
                  SM
                </span>
                <span className="brand-text">Sales Marketing Network</span>
              </Link>

              <nav className="app-nav" aria-label="Primary">
                <Link href="/">Overview</Link>
                <Link href="/">Pipeline</Link>
                <Link href="/">Analytics</Link>
              </nav>
            </div>
          </header>

          <main id="main-content" className="app-main container">
            {children}
          </main>

          <footer className="app-footer">
            <div className="container app-footer-inner">
              <p>© {new Date().getFullYear()} Sales Marketing Network</p>
              <p className="footer-meta">Built for collaborative sales execution and analytics.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
