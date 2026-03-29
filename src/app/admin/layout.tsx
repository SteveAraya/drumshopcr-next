import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — Drum Shop CR',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children
}
