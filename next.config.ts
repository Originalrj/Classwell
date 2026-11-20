import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // O build roda em sandbox; fixa a raiz para nao detectar lockfiles de fora.
  outputFileTracingRoot: process.cwd(),
}

export default nextConfig
