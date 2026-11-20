'use client'

/**
 * CountUp — portado de react-bits (TextAnimations/CountUp).
 *
 * O original depende de `motion/react` (useSpring, useInView, useMotionValue).
 * Mantive o motor. Duas mudancas deliberadas:
 *
 * 1. O original formata sempre em 'en-US'. Aqui e pt-BR, senao "1.200" sai
 *    como "1,200" e o professor le como decimal.
 * 2. Respeita prefers-reduced-motion: sem isso, quem desativou movimento no
 *    sistema ainda veria numeros animando na tela.
 */
import { useInView, useMotionValue, useSpring } from 'motion/react'
import { useCallback, useEffect, useRef } from 'react'

interface CountUpProps {
  to: number
  from?: number
  duration?: number
  delay?: number
  className?: string
  /** Locales de separacao decimal/ milhar. Padrao pt-BR. */
  locale?: string
  /** Numero de casas decimais quando ambos os extremos sao inteiros: 0. */
  onStart?: () => void
}

function decimalPlaces(n: number): number {
  const s = n.toString()
  if (!s.includes('.')) return 0
  const decimals = s.split('.')[1]
  return parseInt(decimals, 10) !== 0 ? decimals.length : 0
}

export default function CountUp({
  to,
  from = 0,
  duration = 1.2,
  delay = 0,
  className = '',
  locale = 'pt-BR',
  onStart,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(from)
  const isInView = useInView(ref, { once: true, margin: '0px' })

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const damping = 20 + 40 * (1 / duration)
  const stiffness = 100 * (1 / duration)
  const springValue = useSpring(motionValue, { damping, stiffness })

  const maxDecimals = Math.max(decimalPlaces(from), decimalPlaces(to))

  const formatValue = useCallback(
    (latest: number) => {
      const hasDecimals = maxDecimals > 0
      return new Intl.NumberFormat(locale, {
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0,
      }).format(latest)
    },
    [locale, maxDecimals],
  )

  // Escreve o valor inicial no DOM antes do efeito do spring, senao o numero
  // fica vazio no primeiro frame.
  useEffect(() => {
    if (ref.current) ref.current.textContent = formatValue(from)
  }, [from, formatValue])

  useEffect(() => {
    if (!isInView) return
    if (prefersReduced) {
      motionValue.set(to)
      return
    }
    onStart?.()
    const id = setTimeout(() => motionValue.set(to), delay * 1000)
    return () => clearTimeout(id)
  }, [isInView, prefersReduced, motionValue, to, delay, onStart])

  useEffect(() => {
    return springValue.on('change', (latest: number) => {
      if (ref.current) ref.current.textContent = formatValue(latest)
    })
  }, [springValue, formatValue])

  return <span className={className} ref={ref} />
}