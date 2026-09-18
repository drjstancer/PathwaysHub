import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'CaPS Pathways Ecosystem',
  description: 'PSMS operations and PathwaysHub analytics/CQI'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="topbar">
          <Link className="brand" href="/"><span>MU</span> CaPS Pathways Ecosystem</Link>
          <nav>
            <Link href="/psms">PSMS</Link>
            <Link href="/hub">PathwaysHub</Link>
            <Link href="/hub/compare">Compare</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
