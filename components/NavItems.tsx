'use client'

import { NAV_ITEMS } from '@/lib/constants'
import React, { use } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const NavItems = () => {

    const pathName = usePathname();

    const isActive = (href: string) => {
        if (href === '/') return pathName === href;
        return pathName.startsWith(href);
    }

  return (
    <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
        {NAV_ITEMS.map(({href, label}) => (
          <li key={href}>
            <Link href={href} className={`hover:text-yellow-500 transition-colors ${isActive(href) ? 'text-gray-100' : ''}`}>
              {label}
            </Link>
          </li>
        ))}
    </ul>
  )
}

export default NavItems
