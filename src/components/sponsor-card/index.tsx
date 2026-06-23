/**
 * Componente: SponsorCard
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=7097-57567
 * Variantes: default
 * Tokens: --color-neutral-100, --color-primary-600, --text-title-md, --text-body-sm, --text-label-sm
 */

import { twMerge } from '~/lib/tw-merge'
import type { ISponsorCardProps } from './types'

export function SponsorCard({
  name,
  logoSrc,
  tagline,
  description,
  href,
  className,
}: ISponsorCardProps) {
  return (
    <article
      className={twMerge(
        'flex flex-col gap-4 rounded-lg bg-white p-6 shadow-md',
        className,
      )}
    >
      <div className="flex h-16 items-center">
        <img
          src={logoSrc}
          alt={`Logo ${name}`}
          className="max-h-full max-w-[180px] object-contain"
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-display font-bold text-title-md text-neutral-950">
          {name}
        </span>
        <span className="font-body text-label-sm text-neutral-500 italic">
          {tagline}
        </span>
      </div>

      <p className="font-body text-body-sm text-neutral-700 line-clamp-3">
        {description}
      </p>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center gap-1 font-body font-semibold text-label-sm text-primary-600 hover:text-primary-700"
      >
        Visitar site
        <span aria-hidden>↗</span>
      </a>
    </article>
  )
}
