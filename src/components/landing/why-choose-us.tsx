
'use client';

import { BarChart, Bot, Brush, Sparkles, Zap } from 'lucide-react';
import React, { Suspense } from 'react';
import { SplineScene } from '@/components/ui/spline';
import { Spotlight } from '@/components/ui/spotlight';

const features = [
  {
    title: 'Crie SaaS com IA',
    description: 'Nossa inteligência artificial gera projetos completos baseados nas suas respostas.',
    content: (
        <div className="w-full h-full bg-black relative flex items-center justify-center">
            <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
            />
        </div>
    ),
    spotlightFill: '#a855f7',
  },
  // Cards removidos temporariamente
];

export default function WhyChooseUs() {
  return (
    <section className="relative bg-background py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(theme(colors.primary/0.1)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute inset-0 -z-20 bg-background" />

      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Por que escolher a{' '}
            <span className="bg-gradient-to-br from-primary to-purple-400 bg-clip-text text-transparent">
              CLICKIFY?
            </span>
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            Tudo o que você precisa para criar SaaS profissionais e escaláveis, em um único lugar.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-background/50 p-6 shadow-2xl shadow-primary/10 transition-all duration-300 hover:border-primary/40 hover:shadow-primary/20"
            >
                <Spotlight
                    className="-top-40 left-0 md:left-30 md:-top-10"
                    fill={feature.spotlightFill}
                />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative text-center">
                <div className="mb-4 flex h-48 w-full items-center justify-center rounded-lg border border-primary/20 bg-black">
                    {feature.content}
                </div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-neutral-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
