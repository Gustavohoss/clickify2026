
'use client';

import { TrendingUp, Users } from 'lucide-react';
import React from 'react';
import { BGPattern } from '@/components/ui/bg-pattern';
import { ResultsLogo } from './results-logo';

const MetricCard = ({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) => (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/30 p-6 shadow-2xl shadow-primary/10 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-primary/20 w-full max-w-xs">
         <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative">
            <div className="mb-4 text-primary">
                {icon}
            </div>
            <p className="text-4xl font-bold text-white mb-2">{value}</p>
            <p className="text-sm text-neutral-400">{label}</p>
        </div>
    </div>
);


export default function Results() {
  return (
    <section className="relative bg-background py-24 sm:py-32">
        <BGPattern variant="grid" fill="hsl(var(--primary) / 0.05)" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background" />

        <div className="container mx-auto px-4 relative z-10">
            <div className="mb-16 text-center">
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                   Nossos <span className="bg-gradient-to-br from-primary to-purple-400 bg-clip-text text-transparent">Resultados</span>
                </h2>
                <p className="mt-4 text-lg text-neutral-400">
                    Veja alguns de nossos números.
                </p>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
                <ResultsLogo />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <MetricCard 
                        icon={<TrendingUp className="w-8 h-8" />}
                        value="+3.961"
                        label="SaaS desenvolvidos pela CLICKIFY IA"
                    />
                    <MetricCard 
                        icon={<Users className="w-8 h-8" />}
                        value="+R$932K"
                        label="Faturados mensalmente por usuários"
                    />
                </div>
            </div>
        </div>
    </section>
  );
}

