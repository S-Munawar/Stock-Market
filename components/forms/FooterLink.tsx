import React from 'react'
import Link from 'next/link'

const FooterLink = ({ href, text, linkText }: { href: string, text: string, linkText: string }) => {
  return (
    <div className="pt-4 text-center">
      <p className='text-sm text-gray-400'>
        {text}{" "}
        <Link href={href} className='text-yellow-500 hover:underline'>
          {linkText}
        </Link>
      </p>
    </div>
  )
}

export default FooterLink
