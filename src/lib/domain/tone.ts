import type {
  Formality,
  StudentProfile,
  Tone,
} from '@/lib/types'

/**
 * SPEC 9.4 — cada campo do tom sai de uma regra visivel.
 * Nada de caixa-preta: o professor ve o resultado e sobrescreve
 * o que quiser via `students.toneOverride`.
 */
export function resolveTone(profile: StudentProfile): Tone {
  // Perfis semeados antes do cadastro completo podem nao ter todos os campos.
  // Normaliza aqui para nao quebrar a listagem de alunos.
  const p: StudentProfile = {
    ...profile,
    age: profile?.age ?? 30,
    country: profile?.country ?? '',
    occupation: profile?.occupation ?? '',
    priorStudyYears: profile?.priorStudyYears ?? 0,
    priorLanguagesStudied: profile?.priorLanguagesStudied ?? [],
    personality: profile?.personality ?? [],
    interests: profile?.interests ?? [],
  }

  return {
    formality: resolveFormality(p.country),
    addressStyle: resolveAddressStyle(p.age, p.personality),
    humor: resolveHumor(p.personality),
    explanationDepth: resolveDepth(p.personality),
    exampleCulture: p.priorLanguagesStudied.length > 0 ? 'learnerL1' : 'target',
    tempoPace: 'medium',
    scaffolding: resolveScaffolding(p.personality),
    errorCorrection: resolveCorrection(p.personality),
    challengeTone: resolveChallengeTone(p.personality),
  }
}

function resolveFormality(country: string): Formality {
  // Brasil pratica "voce"; Portugal pratica "tu". Adjusted by teacher if needed.
  const c = (country ?? '').toLowerCase()
  if (c === 'br' || c === 'brasil' || c === 'brazil') return 'você'
  if (c === 'pt' || c === 'portugal') return 'tu'
  return 'você'
}

function resolveAddressStyle(age: number, personality: string[]): Tone['addressStyle'] {
  const shyOrAnxious = personality.includes('shy') || personality.includes('anxious')
  if (shyOrAnxious) return 'firstName'
  if (age < 30) return 'firstName'
  if (age > 50) return 'formal'
  if (personality.includes('perfectionist')) return 'formal'
  return 'firstName'
}

function resolveHumor(personality: string[]): Tone['humor'] {
  if (personality.includes('shy')) return 'light'
  if (personality.includes('talkative')) return 'playful'
  if (personality.includes('impatient')) return 'light'
  if (personality.includes('perfectionist')) return 'none'
  return 'light'
}

function resolveDepth(personality: string[]): Tone['explanationDepth'] {
  if (personality.includes('analytical')) return 'deep'
  if (personality.includes('impatient')) return 'minimal'
  if (personality.includes('freeform')) return 'minimal'
  return 'standard'
}

function resolveScaffolding(personality: string[]): Tone['scaffolding'] {
  if (personality.includes('anxious') || personality.includes('shy')) return 'high'
  if (personality.includes('perfectionist')) return 'high'
  if (personality.includes('talkative') || personality.includes('impatient')) return 'low'
  return 'medium'
}

function resolveCorrection(personality: string[]): Tone['errorCorrection'] {
  if (personality.includes('anxious')) return 'delayed'
  if (personality.includes('analytical')) return 'immediate'
  if (personality.includes('talkative')) return 'immediate'
  return 'at_end'
}

function resolveChallengeTone(personality: string[]): Tone['challengeTone'] {
  if (personality.includes('anxious') || personality.includes('shy')) return 'encouraging'
  if (personality.includes('impatient')) return 'direct'
  if (personality.includes('talkative')) return 'playful'
  return 'encouraging'
}

/** Mescla overrides do professor por cima do tom resolvido. */
export function mergeTone(base: Tone, override?: Partial<Tone>): Tone {
  return { ...base, ...(override ?? {}) }
}

/**
 * Serializa o tom como instrucao para o modelo de linguagem.
 * Este texto entra no system prompt de toda geracao.
 */
export function toneToPrompt(tone: Tone, studentName: string, profile: StudentProfile): string {
  const lines: string[] = []

  lines.push(
    tone.addressStyle === 'formal'
      ? `Enderece o aluno com tratamento formal.`
      : `Endereça o aluno pelo primeiro nome ("${studentName}"). Nunca por "você" como pronome de tratamento — está usando "${studentName}" como vocativo.`,
  )

  lines.push(
    `Forma de tratamento: "${tone.formality}". Não misture registros no mesmo texto.`,
  )

  if (tone.humor === 'none') {
    lines.push('Sem humor, sem piadas, sem brincadeira.')
  } else if (tone.humor === 'light') {
    lines.push(' Humor leve e occasional, nunca no meio de uma explicação.')
  } else {
    lines.push('Pode usar humor frequente e brincadeira.')
  }

  if (tone.explanationDepth === 'minimal') {
    lines.push('Explicações curtas e diretas. Sem teoria que ele não pediu.')
  } else if (tone.explanationDepth === 'deep') {
    lines.push('Explica o porquê da regra, com contraste e exemplos negativos.')
  } else {
    lines.push('Explicação padrão: o essencial mais um exemplo.')
  }

  if (tone.exampleCulture === 'learnerL1') {
    lines.push(
      `Use analogias com a L1 do aluno (${profile.l1}) quando ajudar a construir intuição.`,
    )
  } else if (tone.exampleCulture === 'both') {
    lines.push('Alterne exemplos do português-alvo e da cultura de origem.')
  } else {
    lines.push('Exemplos sempre do contexto do português-alvo.')
  }

  if (tone.scaffolding === 'high') {
    lines.push('Ofereça bastante apoio visual e estrutura: modelos, checklists, gabarito parcial.')
  } else if (tone.scaffolding === 'low') {
    lines.push('Não embale com andaimes. Vá direto ao conteúdo.')
  }

  lines.push(
    tone.errorCorrection === 'immediate'
      ? 'Corrija erros imediatamente, explaining why.'
      : tone.errorCorrection === 'delayed'
        ? 'Não corrija no meio. Some os erros e devolva todos no final, em bloco, com tom acolhedor.'
        : 'Corrija no final da atividade, não durante.',
  )

  lines.push(
    tone.challengeTone === 'direct'
      ? 'Seja direto ao pedir mais. Sem suavizar.'
      : tone.challengeTone === 'playful'
        ? 'Desafie com leveza e solte um pouco do desafio em tom de brincadeira.'
        : 'Incentive sem ser condescendente.',
  )

  lines.push(
    `Contexto do aluno: ${profile.age} anos, ${profile.occupation} em ${profile.country}. ` +
      (profile.interests.length > 0
        ? `Interesses: ${profile.interests.join(', ')}. Use-os nos exemplos.`
        : 'Sem interesses registrados — use contextos neutros.'),
  )

  return lines.join('\n')
}

/** Descricao curta para exibir na ficha do aluno. */
export function toneSummary(tone: Tone): string {
  const parts = [
    tone.addressStyle === 'formal' ? 'formal' : 'pelo primeiro nome',
    `tratamento "${tone.formality}"`,
    tone.explanationDepth === 'minimal'
      ? 'explicação curta'
      : tone.explanationDepth === 'deep'
        ? 'explicação profunda'
        : 'explicação padrão',
    tone.scaffolding === 'high'
      ? 'muito apoio'
      : tone.scaffolding === 'low'
        ? 'pouco apoio'
        : 'apoio médio',
    tone.errorCorrection === 'immediate'
      ? 'corrige na hora'
      : tone.errorCorrection === 'delayed'
        ? 'corrige no final'
        : 'corrige no fim da atividade',
  ]
  return parts.join(' · ')
}
