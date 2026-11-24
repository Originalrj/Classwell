'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { destinationFor, homeFor, useAuth } from '@/app/providers'
import ShinyText from '@/components/reactbits/ShinyText'

const NAV = [
  { href: '/professor', label: 'Painel' },
  { href: '/professor/alunos', label: 'Alunos' },
  { href: '/professor/biblioteca', label: 'Biblioteca' },
  { href: '/professor/biblioteca/apanhado', label: 'Apanhado' },
  { href: '/professor/config', label: 'Configurações' },
]

export default function ProfessorLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.replace('/entrar')
    if (user && user.role === 'student') router.replace(homeFor(user.role))
    if (user && user.role === 'teacher' && user.approval === 'pending') {
      router.replace(destinationFor(user))
    }
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="grid min-h-screen place-items-center">
        <p className="text-sm text-ink-500">Carregando…</p>
      </div>
    )
  }

  const nav =
    user.role === 'admin'
      ? [...NAV, { href: '/admin/professores', label: 'Aprovações' }]
      : NAV

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-ink-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3.5">
          <Link href="/professor" className="flex items-center gap-2">
            <ShinyText
              text="R"
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500 text-sm font-bold text-white"
              color="#ffffff"
              shineColor="#aeead6"
              speed={4}
              delay={1}
            />
            <span className="text-sm font-semibold text-ink-950">Rampa</span>
          </Link>

          <nav className="flex flex-1 items-center gap-1">
            {nav.map((item) => {
              const active =
                item.href === '/professor'
                  ? pathname === '/professor'
                  : item.href === '/professor/biblioteca'
                    ? pathname.startsWith(item.href) && !pathname.includes('/apanhado')
                    : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative rounded-lg px-3 py-1.5 text-sm transition ${
                    active
                      ? 'font-medium text-ink-950'
                      : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-x-2.5 -bottom-[11px] h-0.5 rounded-full bg-brand-500"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-ink-500 sm:block">{user.displayName}</span>
            <button
              onClick={signOut}
              className="rounded-lg px-2.5 py-1.5 text-sm text-ink-500 transition hover:bg-ink-100 hover:text-ink-800"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  )
}
