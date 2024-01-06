// site-nav.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const siteRoutes = [
    {
        href: '/',
        label: 'Dashboard',
    },
    {
        href: '/createSpecies',
        label: 'Create New',
    },
];

export default function SiteNav() {
    const pathname = usePathname();

    return (
        <nav>
            <ul className="flex gap-x-5 text-[14px] pr-4">
                {siteRoutes.map((siteRoute) => (
                    <li key={siteRoute.href}>
                        <Link
                            href={siteRoute.href}
                            className={`text-zinc-400 transition ${
                                pathname === siteRoute.href ? 'text-zinc-900' : ''
                            }`}
                        >
                            {siteRoute.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
