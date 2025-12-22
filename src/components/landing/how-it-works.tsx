
'use client';

import { BGPattern } from "@/components/ui/bg-pattern";

const steps = [
    {
      number: 1,
      title: "Responda as Perguntas",
      description: "Explique seu projeto, público e propósito. Nossa IA compreenderá e planejará a estrutura ideal.",
      align: "left",
    },
    {
      number: 2,
      title: "Visualize e Personalize",
      description: "Personalize cores, fontes e design de forma simples para refletir a identidade da sua marca.",
      align: "right",
    },
    {
      number: 3,
      title: "Gere com 1 clique",
      description: "Em instantes, seu sistema completo será gerado — interface, servidor e painel de controle inclusos.",
      align: "left",
    },
    {
      number: 4,
      title: "Publique e Lucre",
      description: "Publique online, conecte seu domínio e comece a lucrar com seu novo produto digital.",
      align: "right",
    },
  ];

const HowItWorks = () => {
    return (
        <section className="relative py-24">
            <BGPattern variant="grid" fill="hsl(var(--primary) / 0.05)" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
            <div className="absolute inset-x-0 top-1/4 h-64 bg-primary/10 blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                     <h2 className="text-4xl md:text-5xl text-white font-body text-center">
                        Com a <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">CLICKIFY</span>, desenvolver um SaaS é fácil, ágil e eficiente:
                    </h2>
                </div>

                <div className="relative max-w-3xl mx-auto">
                    {/* Vertical line */}
                    <div className="absolute left-1/2 top-5 bottom-5 w-0.5 bg-gradient-to-b from-transparent via-purple-500 to-transparent -translate-x-1/2 hidden md:block"></div>

                    <div className="space-y-16 md:space-y-24">
                        {steps.map((step, index) => (
                            <div key={index} className="relative flex items-center md:items-start flex-col md:flex-row md:justify-between">
                                {/* Card */}
                                <div className={`w-full md:w-5/12 ${step.align === 'left' ? 'md:pr-8 text-left' : 'md:pl-8 text-left md:order-last'}`}>
                                    <div className="bg-zinc-900/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 [filter:drop-shadow(0_0_8px_hsl(var(--primary)/0.2))]">
                                        <h3 className="font-bold text-purple-400 text-xl mb-2">{step.title}</h3>
                                        <p className="text-neutral-300">{step.description}</p>
                                    </div>
                                </div>
                                
                                {/* Number Circle for Desktop */}
                                <div className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center`}>
                                   <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-[0_0_12px_theme(colors.purple.500/0.5)] ring-1 ring-purple-500/30 relative">
                                        {step.number}
                                         {/* Horizontal connecting line */}
                                        <div className={`absolute h-px bg-purple-500/30 w-8 ${step.align === 'left' ? 'right-full' : 'left-full'}`}></div>
                                    </div>
                                </div>

                                 {/* Number Circle for Mobile */}
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-[0_0_12px_theme(colors.purple.500/0.7)] ring-1 ring-purple-500/50 md:hidden absolute -top-4 left-4">
                                    {step.number}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
