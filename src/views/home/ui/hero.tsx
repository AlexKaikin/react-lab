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
  const backgroundRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!titleRef.current) return

    if (reduceMotion) {
      gsap.set([backgroundRef.current, titleRef.current, taglineRef.current, ctaRef.current], { autoAlpha: 1 })
      return
    }

    const split = SplitText.create(titleRef.current, { type: 'chars', mask: 'chars' })

    gsap.set(backgroundRef.current, { autoAlpha: 0 })
    gsap.set(titleRef.current, { autoAlpha: 1 })
    gsap.set(split.chars, { yPercent: 120, autoAlpha: 0 })
    gsap.set([taglineRef.current, ctaRef.current], { autoAlpha: 0, y: 12 })

    gsap
      .timeline({ defaults: { ease: 'power3.out' } })
      .to(backgroundRef.current, { autoAlpha: 1, duration: 0.8 })
      .to(split.chars, { yPercent: 0, autoAlpha: 1, duration: 0.7, stagger: 0.02 }, '-=0.55')
      .to(taglineRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.35')
      .to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.3')

    return () => split.revert()
  }, [])

  return (
    <div className="relative flex h-dvh container flex-col items-center justify-center gap-6 overflow-hidden text-center">
      <div
        ref={backgroundRef}
        aria-hidden="true"
        className="-z-10 invisible absolute top-1/2 left-1/2 size-[min(70vw,600px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-semantic-primary/10 blur-3xl motion-reduce:visible"
      />

      <h1
        ref={titleRef}
        className="invisible font-bold text-5xl tracking-tight motion-reduce:visible t:text-7xl d:text-8xl"
      >
        {title}
      </h1>
      <p ref={taglineRef} className="invisible t1 max-w-xl text-secondary motion-reduce:visible">
        {tagline}
      </p>
      <div ref={ctaRef} className="invisible motion-reduce:visible">
        <LinkButton href="/blog" variant="contained" color="primary" size="large">
          {ctaLabel}
        </LinkButton>
      </div>
    </div>
  )
}
