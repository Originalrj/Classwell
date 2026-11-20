'use client'

/**
 * ShinyText — portado de react-bits (TextAnimations/ShinyText).
 *
 * O original traz duas camadas de brilho: a animated de shine no CSS e a
 * gradientText inline com WebkitTextFillColor transparent alimentada pelo
 * motion. No modo escuro as duas se somam; em tema claro o texto ficava
 * transparente sobre fundo branco, entao aqui o brilho vem so do gradiente
 * inline e o CSS original nao e importado.
 */
import { useMotionValue, useTransform, useAnimationFrame } from 'motion/react'
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import './ShinyText.css'

interface ShinyTextProps {
  text: string
  disabled?: boolean
  speed?: number
  className?: string
  color?: string
  shineColor?: string
  spread?: number
  delay?: number
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 3,
  className = '',
  color = 'var(--color-ink-900)',
  shineColor = 'var(--color-brand-600)',
  spread = 90,
  delay = 0,
}: ShinyTextProps) {
  const [isPaused, setIsPaused] = useState(false)
  const progress = useMotionValue(0)
  const elapsedRef = useRef(0)
  const lastTimeRef = useRef<number | null>(null)

  const animationDuration = speed * 1000
  const delayDuration = delay * 1000

  useAnimationFrame((time) => {
    if (disabled || isPaused) {
      lastTimeRef.current = null
      return
    }
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time
      return
    }
    elapsedRef.current += time - lastTimeRef.current
    lastTimeRef.current = time

    const cycleTime = elapsedRef.current % (animationDuration + delayDuration)
    const p = (Math.min(cycleTime, animationDuration) / animationDuration) * 100
    progress.set(p)
  })

  // prefers-reduced-motion: congela no fim para o texto ficar legivel e sem
  // varredura luminosa.
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      progress.set(100)
    }
  }, [progress])

  const backgroundPosition = useTransform(progress, (p) => `${150 - p * 2}% center`)

  const handleMouseEnter = useCallback(() => setIsPaused(true), [])
  const handleMouseLeave = useCallback(() => setIsPaused(false), [])

  const gradientStyle: CSSProperties = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }

  return (
    <span
      className={`rb-shiny-text ${className}`}
      // MotionValue<string> nao casa com BackgroundPosition do CSSProperties;
      // o valor e sempre "N% center", que e um background-position valido.
      style={{ ...gradientStyle, backgroundPosition } as unknown as CSSProperties}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </span>
  )
}