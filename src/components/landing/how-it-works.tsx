
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
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-5xl text-white font-body">
                        Com a <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">CLICKIFY</span>, desenvolver um SaaS é fácil, ágil e eficiente:
                    </h2>
                </div>

                <div className="relative max-w-3xl mx-auto">
                    {/* Vertical line */}
                    <div className="absolute left-1/2 top-5 bottom-5 w-0.5 bg-purple-500/20 -translate-x-1/2 hidden md:block"></div>

                    <div className="space-y-16 md:space-y-24">
                        {steps.map((step, index) => (
                            <div key={index} className="relative flex items-center md:items-start flex-col md:flex-row">
                                {/* Card */}
                                <div className={`w-full md:w-5/12 ${step.align === 'left' ? 'md:pr-8' : 'md:pl-8'} ${step.align === 'right' ? 'md:ml-auto' : ''}`}>
                                    <div className="bg-zinc-900/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 shadow-lg shadow-purple-500/10 text-left">
                                        <h3 className="font-bold text-purple-400 text-xl mb-2">{step.title}</h3>
                                        <p className="text-neutral-300">{step.description}</p>
                                    </div>
                                </div>
                                
                                {/* Number Circle and Horizontal Line for Desktop */}
                                <div className={`absolute top-1/2 -translate-y-1/2 hidden md:flex items-center w-auto ${step.align === 'left' ? 'right-1/2 translate-x-full' : 'left-1/2 -translate-x-full'}`}>
                                   {step.align === 'right' && <div className="w-8 h-px bg-purple-500/30"></div> }
                                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-[0_0_12px_theme(colors.purple.500/0.5)] ring-1 ring-purple-500/30">
                                        {step.number}
                                    </div>
                                    {step.align === 'left' && <div className="w-8 h-px bg-purple-500/30"></div> }
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
