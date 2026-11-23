'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { AuthForm } from '@/components/auth-form'
import type { Role } from '@/lib/types'

function LoginPageContent() {
  const params = useSearchParams()
  const modo = params.get('modo') === 'cadastro' ? 'cadastro' : 'entrar'
  const papel: Role = params.get('papel') === 'student' ? 'student' : 'teacher'

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
      <AuthForm initialMode={modo} initialRole={papel} showBackLink />
    </main>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <LoginPageContent />
    </Suspense>
  )
}
