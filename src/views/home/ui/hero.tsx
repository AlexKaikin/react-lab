'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useRef } from 'react'
import { LinkButton } from '@/shared/ui/button'

gsap.registerPlugin(SplitText, useGSAP)

type HeroProps = {
  title: string
  tagline: string
  ctaLabel: string
}

export const Hero = ({ title, tagline, ctaLabel }: HeroProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!titleRef.current || reduceMotion) return

    const split = SplitText.create(titleRef.current, { type: 'chars', mask: 'chars' })

    gsap.set(split.chars, { yPercent: 120, opacity: 0 })
    gsap.set([taglineRef.current, ctaRef.current], { opacity: 0, y: 12 })

    gsap
      .timeline({ defaults: { ease: 'power3.out' } })
      .to(split.chars, { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.02 })
      .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.35')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')

    return () => split.revert()
  }, [])

  return (
    <div className="relative flex h-dvh container flex-col items-center justify-center gap-6 overflow-hidden text-center">
      <div
        aria-hidden="true"
        className="-z-10 absolute top-1/2 left-1/2 size-[min(70vw,600px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-semantic-primary/10 blur-3xl"
      />

      <h1 ref={titleRef} className="font-bold text-5xl tracking-tight t:text-7xl d:text-8xl">
        {title}
      </h1>
      <p ref={taglineRef} className="t1 max-w-xl text-secondary">
        {tagline}
      </p>
      <div ref={ctaRef}>
        <LinkButton href="/blog" variant="contained" color="primary" size="large">
          {ctaLabel}
        </LinkButton>
      </div>
    </div>
  )
}
