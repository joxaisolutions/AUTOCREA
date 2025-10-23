'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm">
      <Link
        href="/"
        className="text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-slate-600" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-300 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
