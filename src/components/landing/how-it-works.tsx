
'use client';

import { BGPattern } from "@/components/ui/bg-pattern";
import { GradientCard } from "@/components/ui/gradient-card";
import { Bot, Code, Palette } from "lucide-react";

const steps = [
    {
      title: "Responda as Perguntas",
      description: "Explique seu projeto, público e propósito. Nossa IA compreenderá e planejará a estrutura ideal.",
      imageUrl: "https://s3.typebot.io/public/workspaces/cmj62bxvv000fju04wwudfwgk/typebots/cmjclddjn000kl204sjzbusjb/blocks/ky3dv4ytx1qde1ipc2mjg1rt?v=1766472190769",
      icon: null
    },
    {
        title: "Visualize e Personalize",
        description: "Personalize cores, fontes e design de forma simples para refletir a identidade da sua marca.",
        imageUrl: "https://s3.typebot.io/public/workspaces/cmj62bxvv000fju04wwudfwgk/typebots/cmjclddjn000kl204sjzbusjb/blocks/dxp2c8agkuhow0krrm2sb4hf?v=1766473755146",
        icon: null
    },
    {
        title: "Gere com 1 clique",
        description: "Em instantes, seu sistema completo será gerado — interface, servidor e painel de controle inclusos.",
        imageUrl: null,
        icon: Code
    },
    {
        title: "Publique e Lucre",
        description: "Publique online, conecte seu domínio e comece a lucrar com seu novo produto digital.",
        imageUrl: null,
        icon: Bot
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={index} className="flex-1 max-w-sm mx-auto w-full">
                           <GradientCard 
                                title={step.title}
                                description={step.description}
                                imageUrl={step.imageUrl}
                                icon={step.icon ? <step.icon className="w-6 h-6 text-white" /> : undefined}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
