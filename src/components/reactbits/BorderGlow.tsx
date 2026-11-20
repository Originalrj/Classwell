'use client'

/**
 * BorderGlow — portado de react-bits (Components/BorderGlow).
 *
 * Sem dependencias externas: anima CSS puro reagindo a --cursor-angle e
 * --edge-proximity, que a propriailha escreve no onPointerMove. Mantive o
 * motor e as mask-images; troquei so a paleta para as cores da marca.
 */
import { useCallback, useEffect, useRef, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import './BorderGlow.css'

interface BorderGlowProps {
  children?: ReactNode
  className?: string
  edgeSensitivity?: number
  glowColor?: string
  glowRadius?: number
  glowIntensity?: number
  coneSpread?: number
  animated?: boolean
  colors?: string[]
  fillOpacity?: number
}

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3)
}
function easeInCubic(x: number) {
  return x * x * x
}

function animateValue({
  start = 0,
  end = 100,
  duration = 1000,
  delay = 0,
  ease = easeOutCubic,
  onUpdate,
  onEnd,
}: {
  start?: number
  end?: number
  duration?: number
  delay?: number
  ease?: (t: number) => number
  onUpdate: (v: number) => void
  onEnd?: () => void
}) {
  const t0 = performance.now() + delay
  function tick() {
    const elapsed = performance.now() - t0
    const t = Math.min(elapsed / duration, 1)
    onUpdate(start + (end - start) * ease(t))
    if (t < 1) requestAnimationFrame(tick)
    else onEnd?.()
  }
  setTimeout(() => requestAnimationFrame(tick), delay)
}

const GRADIENT_POSITIONS = [
  '80% 55%',
  '69% 34%',
  '8% 6%',
  '41% 38%',
  '86% 85%',
  '82% 18%',
  '51% 4%',
]
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1]

function buildGradientVars(colors: string[]) {
  const vars: Record<string, string> = {}
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)]
    vars[`--gradient-${i}`] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`
  }
  vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`
  return vars
}

export default function BorderGlow({
  children,
  className = '',
  edgeSensitivity = 30,
  glowColor = '168 76% 45%',
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 25,
  animated = false,
  colors = ['#40c1a2', '#1fa78a', '#f5a524'],
  fillOpacity = 0.35,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handlePointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current
    // Em toque nao existe "borda perto do cursor": manter a varivel parada
    // deixaria o brilho congelado num ponto qualquer do card.
    if (!card || e.pointerType !== 'mouse') return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const cx = rect.width / 2
    const cy = rect.height / 2
    const dx = x - cx
    const dy = y - cy

    let kx = Infinity
    let ky = Infinity
    if (dx !== 0) kx = cx / Math.abs(dx)
    if (dy !== 0) ky = cy / Math.abs(dy)
    const proximity = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1)

    let angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90
    if (angle < 0) angle += 360

    card.style.setProperty('--edge-proximity', `${(proximity * 100).toFixed(3)}`)
    card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`)
  }, [])

  useEffect(() => {
    if (!animated || !cardRef.current) return
    const card = cardRef.current
    const angleStart = 110
    const angleEnd = 465

    card.classList.add('rb-sweep-active')

    animateValue({
      duration: 500,
      onUpdate: (v) => card.style.setProperty('--edge-proximity', `${v}`),
    })
    animateValue({
      ease: easeInCubic,
      duration: 1500,
      end: 50,
      onUpdate: (v) =>
        card.style.setProperty(
          '--cursor-angle',
          `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`,
        ),
    })
    animateValue({
      ease: easeOutCubic,
      delay: 1500,
      duration: 2250,
      start: 50,
      end: 100,
      onUpdate: (v) =>
        card.style.setProperty(
          '--cursor-angle',
          `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`,
        ),
    })
    animateValue({
      ease: easeInCubic,
      delay: 2500,
      duration: 1500,
      start: 100,
      end: 0,
      onUpdate: (v) => card.style.setProperty('--edge-proximity', `${v}`),
      onEnd: () => card.classList.remove('rb-sweep-active'),
    })
  }, [animated])

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={`rb-border-glow ${className}`}
      style={
        {
          '--edge-sensitivity': edgeSensitivity,
          '--glow-padding': `${glowRadius}px`,
          '--cone-spread': coneSpread,
          '--fill-opacity': fillOpacity,
          '--glow-color': `hsl(${glowColor})`,
          '--glow-color-40': `hsl(${glowColor} / ${40 * glowIntensity}%)`,
          '--glow-color-30': `hsl(${glowColor} / ${30 * glowIntensity}%)`,
          '--glow-color-20': `hsl(${glowColor} / ${20 * glowIntensity}%)`,
          '--glow-color-10': `hsl(${glowColor} / ${10 * glowIntensity}%)`,
          ...buildGradientVars(colors),
        } as CSSProperties
      }
    >
      <span className="rb-edge-light" />
      <div className="rb-border-glow-inner">{children}</div>
    </div>
  )
}