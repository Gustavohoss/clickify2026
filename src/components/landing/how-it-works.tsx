
'use client';

import { BGPattern } from "@/components/ui/bg-pattern";
import { GradientCard } from "@/components/ui/gradient-card";
import { Briefcase, Code, Pencil, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
    {
      number: 1,
      title: "Responda as Perguntas",
      description: "Explique seu projeto, público e propósito. Nossa IA compreenderá e planejará a estrutura ideal.",
      align: "left",
      icon: <Pencil className="w-6 h-6 text-white" />
    },
    {
      number: 2,
      title: "Visualize e Personalize",
      description: "Personalize cores, fontes e design de forma simples para refletir a identidade da sua marca.",
      align: "right",
      icon: <Briefcase className="w-6 h-6 text-white" />
    },
    {
      number: 3,
      title: "Gere com 1 clique",
      description: "Em instantes, seu sistema completo será gerado — interface, servidor e painel de controle inclusos.",
      align: "left",
      icon: <Code className="w-6 h-6 text-white" />
    },
    {
      number: 4,
      title: "Publique e Lucre",
      description: "Publique online, conecte seu domínio e comece a lucrar com seu novo produto digital.",
      align: "right",
      icon: <UploadCloud className="w-6 h-6 text-white" />
    },
  ];

const HowItWorks = () => {
    return (
        <section className="relative py-24 bg-black">
            <BGPattern variant="grid" fill="hsl(var(--primary) / 0.05)" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
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

                    <div className="space-y-16 md:space-y-0 md:grid md:gap-y-24">
                        {steps.map((step, index) => (
                            <div key={index} className="relative md:grid md:grid-cols-2 md:items-center md:gap-x-8">
                               
                                {/* Card */}
                                <div className={`relative ${step.align === 'right' ? 'md:col-start-2' : 'md:col-start-1'}`}>
                                     {/* Number Circle for Mobile */}
                                     <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-primary-foreground font-bold md:hidden absolute -top-4 left-4 z-10", "gradient-step-icon")}>
                                        {step.number}
                                    </div>
                                    <GradientCard 
                                        title={step.title}
                                        description={step.description}
                                        icon={step.icon}
                                    />
                                </div>
                                
                                {/* Number Circle and Connector for Desktop */}
                                <div className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center`}>
                                   <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-primary-foreground font-bold relative", "gradient-step-icon")}>
                                        {step.number}
                                        {/* Horizontal connecting line */}
                                        <div className={`absolute h-px bg-purple-500/30 w-8 ${step.align === 'left' ? 'right-full' : 'left-full'}`}></div>
                                    </div>
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
