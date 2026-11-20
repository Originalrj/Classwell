'use client'

/**
 * SpotlightCard — portado de react-bits (Components/SpotlightCard).
 *
 * O original e dark-only (#111 de fundo, borda #222) e nao casa com o tema
 * claro do painel. Aqui o CSS usa as cores ink/brand, e o spotlight so aparece
 * quando o ponteiro e um dispositivo com hover de verdade: em toque, o card
 * ficaria com brilho preso na ultima posicao.
 */
import type { ReactNode } from 'react'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  spotlightColor?: string
  /** Desliga o efeito sem desmontar (ex.: lista dentro de contêiner com prefers-reduced-motion). */
  disabled?: boolean
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor,
  disabled = false,
}: SpotlightCardProps) {
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    // onMouseMove so dispara para mouse, entao nao ha pointerType aqui: o
    // filtro de toque fica em quem decide renderizar o efeito.
    if (disabled || !e.currentTarget) return
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
    if (spotlightColor) {
      e.currentTarget.style.setProperty('--spotlight-color', spotlightColor)
    }
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`rb-spotlight-card ${className}`}
    >
      {children}
    </div>
  )
}