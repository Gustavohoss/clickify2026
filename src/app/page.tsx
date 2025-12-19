'use client';

import { GradientButton } from '@/components/ui/gradient-button';
import { BGPattern } from '@/components/ui/bg-pattern';
import { Header } from '@/components/landing/header';
import Safari_01 from '@/components/ui/safari-01';

export default function BlankPage() {
  return (
    <div className="text-white relative min-h-screen">
      <Header />
      <BGPattern variant="grid" fill="hsl(var(--border))" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      <div className="container mx-auto max-w-5xl text-center flex flex-col items-center justify-center pt-32 pb-16 relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white/90 to-white/40 leading-tight">
          A forma mais rápida de
          <br />
          criar seu{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-violet-500">
            SaaS
          </span>
        </h1>
        <p className="mt-6 text-lg text-white/60 max-w-xl">
          Conheça a CLICKIFY e crie negócios digitais completos com IA em
          minutos.
        </p>
        <div className="mt-8 flex gap-4">
          <GradientButton variant="variant">
            Assinar agora
          </GradientButton>
        </div>
        <div className="mt-20 w-full">
          <Safari_01 className="w-full max-w-4xl mx-auto" />
        </div>
      </div>
      <div className="h-[100vh]"></div>
    </div>
  );
}
