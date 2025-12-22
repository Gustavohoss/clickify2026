'use client';

import { GradientButton } from '@/components/ui/gradient-button';
import { BGPattern } from '@/components/ui/bg-pattern';
import { Header } from '@/components/landing/header';
import Safari_01 from '@/components/ui/safari-01';
import Link from 'next/link';

export default function BlankPage() {
  return (
    <div className="text-white relative min-h-screen">
      <Header />
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-fuchsia-500/10 rounded-full mix-blend-normal filter blur-[96px] animate-pulse delay-1000" />
      </div>
      <BGPattern variant="grid" fill="hsl(var(--border))" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      <div className="container mx-auto max-w-5xl text-center flex flex-col items-center justify-center pt-32 pb-16 relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white/90 to-white/40 leading-tight">
          A forma mais rápida de
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-500">
            criar seu SaaS
          </span>
        </h1>
        <p className="mt-6 text-lg text-white/60 max-w-xl">
          Conheça a CLICKIFY e crie negócios digitais completos com IA em
          minutos.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/login">
            <GradientButton variant="variant">
              Assinar agora
            </GradientButton>
          </Link>
        </div>
        <div className="mt-20 w-full">
          <Safari_01 url="https://pizza-hot-go.lovable.app" />
        </div>
      </div>
    </div>
  );
}
