
'use client';

import { BarChart, Bot, Brush, Sparkles, Zap } from 'lucide-react';
import React from 'react';

const features = [
  {
    title: 'Crie SaaS com IA',
    description: 'Nossa inteligência artificial gera projetos completos baseados nas suas respostas.',
    icon: <Bot className="w-8 h-8 text-primary" />,
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <Bot className="w-16 h-16 text-primary/50" />
      </div>
    ),
  },
  {
    title: 'Atualizações com 1 clique',
    description: 'Modifique e evolua seus projetos existentes sem complicação.',
    icon: <Zap className="w-8 h-8 text-primary" />,
    content: (
        <div className="flex h-full w-full items-center justify-center p-4">
            <div className="w-full rounded-lg bg-primary/10 p-3 text-left text-sm border border-primary/20">
                <div className="flex items-center gap-2 text-primary">
                    <Zap className="w-4 h-4 animate-pulse" />
                    <span>Atualizando: criador de quiz interativo</span>
                </div>
                <p className="text-xs text-primary/70 mt-1">Criado em 30/04/2025, 18:34</p>
            </div>
      </div>
    ),
  },
  {
    title: 'Visual Personalizado',
    description: 'Escolha cores, fontes e estilos para seu projeto.',
    icon: <Brush className="w-8 h-8 text-primary" />,
    content: (
        <div className="flex h-full w-full flex-col items-start justify-center p-4 text-left gap-4">
            <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <p className="text-sm text-white/80">Qual estilo visual deseja aplicar ao seu SaaS?</p>
            </div>
            <div className="flex gap-2">
                <button className="rounded-md bg-background/50 border border-white/10 px-3 py-1.5 text-xs text-white/60 transition-colors hover:bg-white/10 hover:text-white">Futurista</button>
                <button className="rounded-md bg-background/50 border border-white/10 px-3 py-1.5 text-xs text-white/60 transition-colors hover:bg-white/10 hover:text-white">Minimalista</button>
                <button className="rounded-md bg-primary/20 border border-primary/50 px-3 py-1.5 text-xs text-primary transition-colors hover:bg-primary/30">Dark Mode</button>
            </div>
      </div>
    ),
  },
  {
    title: 'Analytics Integrado',
    description: 'Veja o desempenho do seu SaaS em tempo real.',
    icon: <BarChart className="w-8 h-8 text-primary" />,
    content: (
      <div className="flex h-full w-full items-end justify-center gap-1.5 p-4">
        <div className="h-1/4 w-full rounded-t-sm bg-primary/60 animate-pulse-fast" />
        <div className="h-1/2 w-full rounded-t-sm bg-primary/80 animate-pulse" />
        <div className="h-1/3 w-full rounded-t-sm bg-primary/60 animate-pulse-slow" />
        <div className="h-2/3 w-full rounded-t-sm bg-primary animate-pulse-slower" />
        <div className="h-full w-full rounded-t-sm bg-primary animate-pulse-fastest" />
      </div>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative bg-background py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#8634cc_1px,transparent_1px)] [background-size:32px_32px]" />
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
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 flex h-24 w-full items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
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
