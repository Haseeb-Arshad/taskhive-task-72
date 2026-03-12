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

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Sales Marketing Network",
    template: "%s · Sales Marketing Network",
  },
  description:
    "Collaborative sales marketing workspace for pipeline management, team performance analytics, and real-time execution.",
  applicationName: "Sales Marketing Network",
  keywords: [
    "sales",
    "marketing",
    "CRM",
    "analytics",
    "pipeline",
    "dashboard",
    "team collaboration",
  ],
  openGraph: {
    title: "Sales Marketing Network",
    description:
      "Collaborative sales marketing workspace for pipeline management, team performance analytics, and real-time execution.",
    type: "website",
    siteName: "Sales Marketing Network",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sales Marketing Network",
    description:
      "Real-time sales collaboration, performance dashboards, and analytics for distributed teams.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1020" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>

        <div className="app-shell">
          <header className="app-header" role="banner">
            <div className="container header-inner">
              <div className="brand-block" aria-label="Sales Marketing Network">
                <span className="brand-mark" aria-hidden="true">
                  SM
                </span>
                <div className="brand-text">
                  <p className="brand-title">Sales Marketing Network</p>
                  <p className="brand-subtitle">Team-first revenue operations</p>
                </div>
              </div>

              <nav className="top-nav" aria-label="Primary navigation">
                <Link href="/">Dashboard</Link>
                <Link href="/">Pipeline</Link>
                <Link href="/">Team</Link>
                <Link href="/">Reports</Link>
              </nav>

              <div className="header-pill" aria-live="polite">
                <span className="status-dot" aria-hidden="true" />
                System Ready
              </div>
            </div>
          </header>

          <div className="container app-body">
            <aside className="sidebar" aria-label="Workspace sections">
              <p className="sidebar-title">Workspace</p>
              <ul className="sidebar-list">
                <li>Lead Database</li>
                <li>Deal Tracking</li>
                <li>Activity Feed</li>
                <li>Performance KPIs</li>
                <li>Export Center</li>
              </ul>
            </aside>

            <main id="main-content" className="main-content" role="main">
              {children}
            </main>
          </div>

          <footer className="app-footer" role="contentinfo">
            <div className="container footer-inner">
              <p>© {currentYear} Sales Marketing Network</p>
              <p>Built for high-velocity sales teams and measurable growth.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
