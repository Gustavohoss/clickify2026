
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Footer } from '@/components/ui/footer-section';
import { Header } from '@/components/landing/header';
import { GradientButton } from '@/components/ui/gradient-button';
import Safari_01 from "@/components/ui/safari-01";
import { BGPattern } from '@/components/ui/bg-pattern';

const steps = [
    {
      number: "1",
      title: "Responda as Perguntas",
      description: "Explique seu projeto, público e propósito. Nossa IA compreenderá e planejará a estrutura ideal.",
    },
    {
      number: "2",
      title: "Visualize e Personalize",
      description: "Personalize cores, fontes e design de forma simples para refletir a identidade da sua marca.",
    },
    {
      number: "3",
      title: "Gere com 1 clique",
      description: "Em instantes, seu sistema completo será gerado — interface, servidor e painel de controle inclusos.",
    },
    {
      number: "4",
      title: "Publique e Lucre",
      description: "Publique online, conecte seu domínio e comece a lucrar com seu novo produto digital.",
    },
  ];

export default function LandingPage() {
  return (
    <div className="bg-black text-white">
      <Header />
      <main className="pt-40 relative overflow-hidden">
        <section className="relative flex flex-col items-center justify-center text-center min-h-[calc(100vh-10rem)] p-4 md:p-8">
            <BGPattern variant="grid" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="w-full max-w-4xl mx-auto relative z-10">
            <motion.div
                className="relative z-10 space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <motion.h1 
                className="text-5xl md:text-7xl font-bold tracking-tight pb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/60">A forma mais rápida</span>
                <br />
                <span className="text-purple-400">de criar seu SaaS</span>
                </motion.h1>
                <motion.p
                className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                >
                Conheça a CLICKIFY e crie negócios digitais completos com IA em minutos.
                </motion.p>
                
                <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center gap-12"
                >
                <Link href="/login" passHref>
                    <GradientButton variant="variant" asChild>
                    <motion.div
                        className="group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>Assinar agora</span>
                    </motion.div>
                    </GradientButton>
                </Link>
                 <div className="w-full shadow-[0_0_20px_rgba(192,132,252,0.05)] rounded-2xl">
                    <Safari_01 />
                 </div>
                </motion.div>
            </motion.div>
            </div>
        </section>
        
        <section className="w-full max-w-5xl mx-auto py-20 md:py-32 relative z-10 mt-16">
            <div className="absolute inset-0 z-0 h-full w-full bg-[radial-gradient(#2d2d2d_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            <div className="relative z-10 text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white/90 to-white/50">Com a <span className="text-purple-400">CLICKIFY</span>, desenvolver um SaaS</span>
                <br />
                é fácil, ágil e eficiente:
              </h2>
            </div>
            
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 -ml-px md:left-1/2 md:-ml-0.5 w-0.5 h-full bg-gradient-to-b from-purple-500/0 via-purple-500/50 to-purple-500/0"></div>

              <div className="space-y-16">
                {steps.map((step, index) => (
                  <div key={step.number} className="relative flex items-start md:items-center flex-col md:flex-row md:even:flex-row-reverse group">
                    <div className="flex-1 md:pr-12 md:even:pr-0 md:even:pl-12">
                      <motion.div
                        className="p-6 rounded-2xl border border-purple-500/30 bg-black/40 backdrop-blur-sm w-full max-w-md ml-auto md:even:ml-0 md:even:mr-auto shadow-[0_0_20px_rgba(192,132,252,0.15)] transition-all duration-300 md:group-hover:scale-105"
                        initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      >
                        <h3 className="text-xl font-bold text-purple-400 mb-2">{step.title}</h3>
                        <p className="text-white/60">{step.description}</p>
                      </motion.div>
                    </div>

                    <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-purple-900/80 border border-purple-500/50 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(192,132,252,0.4)] transition-all duration-300 md:group-hover:scale-125">
                            {step.number}
                        </div>
                    </div>
                     <div className="hidden md:block flex-1">
                       {/* Empty div for spacing */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

      </main>
      <Footer />
    </div>
  );
}
