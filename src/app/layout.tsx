import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SiteNav from '@/components/site-nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'aiwc-data-collect',
    description: 'data entry UI for managing fauna data',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>{metadata.title?.toString()}</title>
        </head>
        <body className={`${inter.className} bg-zinc-100 text-zinc-900`}>
        {/* Header */}
        <header className="bg-zinc-500 py-4 text-white text-left bg-clip-padding flex justify-between items-center">
            <h1 className="text-2xl font-bold pl-4">aiwc-data-collect</h1>
            {/* Navigation */}
            <SiteNav/>
        </header>

        {/* Main Content */}
        {children}


        </body>
        </html>
    );
}
