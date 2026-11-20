import type { Metadata } from 'next'
import { AuthProvider } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rampa — Português para estrangeiros',
  description:
    'Acompanhamento estruturado de alunos de PLE: diagnóstico por competência, rampa de aprendizado personalizada, material e tarefas.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
