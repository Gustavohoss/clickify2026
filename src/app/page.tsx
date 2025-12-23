
'use client';

import { Button } from "@/components/ui/button-glow"; 
import Link from "next/link";
import Image from "next/image";
import React from 'react';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BGPattern } from "@/components/ui/bg-pattern"; 
import { Header } from "@/components/landing/header";
import SocialProof from "@/components/landing/social-proof";
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-glow"; 
import { Footer } from "@/components/ui/footer-section";
import HowItWorks from "@/components/landing/how-it-works";
import WhyChooseUs from "@/components/landing/why-choose-us";
import Results from "@/components/landing/results";
import { ArrowRight, Building2, FileText, Search, Sparkles } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";

const partners = [
  PlaceHolderImages.find(p => p.id === 'kiwify-logo'),
  PlaceHolderImages.find(p => p.id === 'perfectpay-logo'),
  PlaceHolderImages.find(p => p.id === 'hotmart-logo'),
  PlaceHolderImages.find(p => p.id === 'monetizze-logo'),
  PlaceHolderImages.find(p => p.id === 'braip-logo'),
  PlaceHolderImages.find(p => p.id === 'kirvano-logo'),
].filter(Boolean);

const MovingRibbon = ({ reverse = false }: { reverse?: boolean }) => (
  <div className={`absolute h-12 w-[300%] -rotate-[25deg] bg-primary flex items-center justify-center gap-12 text-black font-semibold text-lg ${reverse ? "animate-slide-reverse" : "animate-slide"}`}>
    {Array(10).fill(null).map((_, i) => (
      <React.Fragment key={i}>
        <span>Nuxdrop.io</span>
        <span className="text-primary-foreground/50">&#10003;</span>
        <span>Typebot</span>
        <span className="text-primary-foreground/50">&#10003;</span>
        <span>PerfectPay</span>
        <span className="text-primary-foreground/50">&#10003;</span>
        <span>Cakto</span>
        <span className="text-primary-foreground/50">&#10003;</span>
      </React.Fragment>
    ))}
  </div>
);

const InfiniteMovingLogos = () => {
    const logosWithDuplicates = [...partners, ...partners];
    return (
        <div className="w-full max-w-4xl mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
            <div className="flex animate-slide w-max">
                {logosWithDuplicates.map((logo, index) => (
                    <div key={`${logo!.id}-${index}`} className="w-32 h-16 flex items-center justify-center mx-4">
                        <Image
                            src={logo!.imageUrl}
                            alt={logo!.description}
                            width={100}
                            height={40}
                            className="object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};


export default function Home() {

  return (
    <main className="dark">
       <Header />
       <style jsx global>{`
        @keyframes slide {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-slide {
          animation: slide 20s linear infinite;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <div className="relative w-full flex flex-col items-center justify-center overflow-hidden pt-32 pb-20">
        <BGPattern variant="grid" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-fuchsia-500/10 rounded-full mix-blend-normal filter blur-[96px] animate-pulse delay-1000" />
        <div className="relative z-20 max-w-4xl px-4 text-center">
           <h1 className="md:text-5xl text-3xl lg:text-6xl text-white font-body">
            A forma mais rápida de
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">criar seu SaaS</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-300 max-w-2xl mx-auto">
            Conheça a CLICKIFY e crie negócios digitais completos com IA em minutos.
          </p>
        </div>
        
        <div className="relative z-20 mt-12 flex flex-col items-center gap-8 w-full max-w-5xl px-4 md:px-8">
            {/* PAINEL RECREATED HERE */}
            <div className="w-full max-w-5xl mx-auto relative z-10 bg-black/80 border border-purple-500/20 rounded-2xl p-8 shadow-2xl shadow-purple-500/10 backdrop-blur-sm">
                <div
                    className="relative z-10 space-y-12"
                >
                    <div className="text-left space-y-4">
                        <div
                            className="inline-block"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/60 pb-2">
                            Bem-vindo, ADM
                            </h1>
                        </div>
                        <p
                            className="text-lg text-white/50 max-w-2xl"
                        >
                            Escolha uma das ferramentas abaixo para começar.
                        </p>
                    </div>
                    
                    <div 
                    className="group relative p-3 rounded-2xl overflow-hidden bg-background/50 border border-primary/20 transition-all duration-300 ease-in-out hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer"
                    >
                    <Spotlight
                        className="-top-20 -left-20 md:left-0 md:-top-10"
                        fill={'#a855f7'}
                    />
                    <div className="relative z-10 flex items-center justify-around gap-6 text-sm text-zinc-400">
                        <div className="flex items-center gap-2">
                        <span className="text-base">🔥</span>
                        <span><span className="font-bold text-white">2</span> Leads capturados hoje</span>
                        </div>
                        <div className="h-4 w-px bg-zinc-700"></div>
                        <div className="flex items-center gap-2">
                        <span className="text-base">⚡</span>
                        <span>Último uso: <span className="font-bold text-white">Scraper</span> (há 2h)</span>
                        </div>
                        <div className="h-4 w-px bg-zinc-700"></div>
                        <div className="flex items-center gap-2">
                        <span className="text-base">💎</span>
                        <span>Plano <span className="font-bold text-purple-400">Pro</span> Ativo</span>
                        </div>
                    </div>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div
                        className="group relative p-6 rounded-2xl overflow-hidden h-full bg-background/50 border border-primary/20 transition-all duration-300 ease-in-out hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20 cursor-default"
                    >
                        <Spotlight
                            className="-top-20 -left-20 md:left-0 md:-top-10"
                            fill={'#a855f7'}
                        />
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                            CLICKIFY Scraper
                            </h2>
                            <p className="text-white/40 mt-2">
                            Uma ferramenta de varredura para encontrar informações de estabelecimentos.
                            </p>
                        </div>
                        <div className="mt-6 flex items-center text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                            Acessar Ferramenta
                            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                        <Search className="absolute -right-8 -bottom-8 h-32 w-32 text-white/5 group-hover:text-primary/10 transition-colors duration-500"/>
                    </div>
                    <div
                        className="group relative p-6 rounded-2xl overflow-hidden h-full bg-background/50 border border-primary/20 transition-all duration-300 ease-in-out hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/20 cursor-default"
                    >
                        <Spotlight
                            className="-top-20 -left-20 md:left-0 md:-top-10"
                            fill={'#f97316'}
                        />
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                            Gestão de Leads
                            </h2>
                            <p className="text-white/40 mt-2">
                            Gerencie e anote os contatos que você salvou.
                            </p>
                        </div>
                        <div className="mt-6 flex items-center text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                            Acessar Ferramenta
                            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                        <FileText className="absolute -right-8 -bottom-8 h-32 w-32 text-white/5 group-hover:text-orange-500/10 transition-colors duration-500"/>
                    </div>
                    <div
                        className="group relative p-6 rounded-2xl overflow-hidden h-full bg-background/50 border border-primary/20 transition-all duration-300 ease-in-out hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/20 cursor-default"
                    >
                        <Spotlight
                            className="-top-20 -left-20 md:left-0 md:-top-10"
                            fill={'#3b82f6'}
                        />
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                            Gerar Contrato
                            </h2>
                            <p className="text-white/40 mt-2">
                            Crie contratos profissionais para seus clientes em minutos.
                            </p>
                        </div>
                        <div className="mt-6 flex items-center text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                            Acessar Ferramenta
                            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                        <FileText className="absolute -right-8 -bottom-8 h-32 w-32 text-white/5 group-hover:text-blue-500/10 transition-colors duration-500"/>
                    </div>
                    <div
                        className="group relative p-6 rounded-2xl overflow-hidden h-full bg-background/50 border border-primary/20 transition-all duration-300 ease-in-out hover:border-yellow-500/40 hover:shadow-2xl hover:shadow-yellow-500/20 cursor-default"
                    >
                        <Spotlight
                            className="-top-20 -left-20 md:left-0 md:-top-10"
                            fill={'#eab308'}
                        />
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                            Abordagem de Empresas
                            </h2>
                            <p className="text-white/40 mt-2">
                            Modelos de mensagens e scripts para prospecção.
                            </p>
                        </div>
                        <div className="mt-6 flex items-center text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                            Acessar Ferramenta
                            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                        <Building2 className="absolute -right-8 -bottom-8 h-32 w-32 text-white/5 group-hover:text-yellow-500/10 transition-colors duration-500"/>
                    </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        <div
                            className="group relative p-6 rounded-2xl overflow-hidden h-full bg-background/50 border border-primary/20 transition-all duration-300 ease-in-out hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/20 cursor-default"
                        >
                        <Spotlight
                            className="-top-20 -left-20 md:left-0 md:-top-10"
                            fill={'#6366f1'}
                        />
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                            Cria SAAS
                            </h2>
                            <p className="text-white/40 mt-2">
                            Crie a base do seu SAAS ou pegue um ja pronto!
                            </p>
                        </div>
                        <div className="mt-6 flex items-center text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                            Acessar Ferramenta
                            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                        <Sparkles className="absolute -right-8 -bottom-8 h-32 w-32 text-white/5 group-hover:text-indigo-500/10 transition-colors duration-500"/>
                        </div>
                    </div>
                </div>
            </div>

            <InfiniteMovingLogos />
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              <Button asChild size="lg" className="w-64 h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full">
                <Link href="#pricing">Assinar agora</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-64 h-14 text-lg bg-transparent border-primary text-primary hover:bg-primary/10 rounded-full">
                <Link href="#pricing">Ver Planos</Link>
              </Button>
            </div>
        </div>

      </div>

      <SocialProof />
      <HowItWorks />
      <WhyChooseUs />
      <Results />

      <section className="relative py-20 pb-32 text-center overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white font-body">
            Mais de <span className="text-primary">1000 membros</span> ativos!
          </h2>
          <p className="mt-4 text-lg text-neutral-300 max-w-3xl mx-auto">
            Entre para a Clickify e faça parte da elite dos que vendem. Aprenda, fature e seja reconhecido com uma premiação especial após 7 Dias na Clickify!
          </p>
          <div className="mt-12 flex justify-center">
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="relative"
            >
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-purple-500/50 rounded-full blur-3xl" />
              <Image
                src="https://s3.typebot.io/public/workspaces/cmin0v9k5001cl404bcq7x2qj/typebots/cmin0visp0001l704z3ncv1yg/blocks/wy7wp7ti2bxdxwqhuu1vch8p?v=1764956144895"
                alt="Pulseira de premiação Clickify"
                width={400}
                height={400}
                className="relative z-10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="pricing" className="relative overflow-hidden bg-background text-foreground pt-10 pb-20 text-center scroll-mt-20">
        <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-8">
            <h1 className="md:text-5xl text-3xl lg:text-6xl text-white font-body">
              <span className="text-primary">Escolha o plano ideal para você.</span> Comece seu negócio com a liberdade de <span className="text-primary">crescer ainda mais.</span>
            </h1>
            <p className="mt-4 text-lg text-neutral-400">Planos flexíveis para todas as necessidades</p>
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-8 mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Plano Mensal */}
                <div className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-background/50 p-6 shadow-xl shadow-primary/10 transition-all duration-300 hover:border-primary/40 hover:shadow-primary/20 text-left">
                    <h3 className="text-2xl font-bold text-white">Plano Mensal</h3>
                    <p className="text-gray-400 mt-1">Ideal para começar.</p>
                    
                    <p className="text-4xl font-bold mt-6 text-white">
                        R$149,00<span className="text-lg font-normal text-gray-400">/mês</span>
                    </p>

                    <ul className="mt-8 space-y-4 text-white">
                        {["Gerador de SaaS Premium Ilimitado", "Gerador de página de vendas", "Prospecte clientes Ilimitado", "Suporte exclusivo (Whatsapp)"].map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <Image src="https://s3.typebot.io/public/workspaces/cmj62bxvv000fju04wwudfwgk/typebots/cmjclddjn000kl204sjzbusjb/blocks/ngqxix0w0j29xfjugomz1zux?v=1766473357190" alt="Checkmark" width={24} height={24} className="h-6 w-6 flex-shrink-0" />
                            <span className="font-medium">{feature}</span>
                        </li>
                        ))}
                    </ul>
                    
                    <Button 
                        size="lg" 
                        className="mt-10 w-full font-bold bg-white/5 border border-white/10 hover:bg-white/10"
                        onClick={() => window.location.href='https://pay.cakto.com.br/xy27qg8'}
                    >
                        Assinar Mensal
                    </Button>
                </div>
                
                {/* Plano Trimestral */}
                <div className="group relative rounded-2xl border-2 border-primary/80 bg-background/50 p-6 shadow-2xl shadow-primary/20 text-left">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
                        MAIS POPULAR
                    </div>
                    <h3 className="text-2xl font-bold text-white">Plano Trimestral</h3>
                    <p className="text-gray-400 mt-1">Economize 50%</p>
                    
                    <div className="mt-6">
                      <p className="text-sm text-gray-500 line-through">de R$549 por</p>
                      <p className="text-4xl font-bold text-white">
                          R$249,00<span className="text-lg font-normal text-gray-400">/3 meses</span>
                      </p>
                    </div>

                    <ul className="mt-8 space-y-4 text-white">
                        {["Tudo do plano mensal", "Calls semanais ao vivo", "Serviços de Freelancer"].map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <Image src="https://s3.typebot.io/public/workspaces/cmj62bxvv000fju04wwudfwgk/typebots/cmjclddjn000kl204sjzbusjb/blocks/ngqxix0w0j29xfjugomz1zux?v=1766473357190" alt="Checkmark" width={24} height={24} className="h-6 w-6 flex-shrink-0" />
                            <span className="font-medium">{feature}</span>
                        </li>
                        ))}
                        <li className="flex items-center gap-2">
                           <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 text-primary px-3 py-1 text-sm font-medium">
                               50% de desconto
                           </div>
                        </li>
                    </ul>
                    
                    <Button
                        size="lg" 
                        variant="glow" 
                        className="mt-10 w-full font-bold"
                        onClick={() => window.location.href='https://pay.cakto.com.br/37k4xrc_658280'}
                    >
                        Assinar Trimestral
                    </Button>
                </div>
                
                {/* Plano Anual */}
                 <div className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-background/50 p-6 shadow-xl shadow-primary/10 transition-all duration-300 hover:border-primary/40 hover:shadow-primary/20 text-left">
                    <h3 className="text-2xl font-bold text-white">Plano Anual</h3>
                    <p className="text-gray-400 mt-1">Maior economia!</p>
                    
                    <div className="mt-6">
                      <p className="text-sm text-gray-500 line-through">de R$2.349 por</p>
                      <p className="text-4xl font-bold text-white">
                          R$949,00<span className="text-lg font-normal text-gray-400">/ano</span>
                      </p>
                    </div>

                    <ul className="mt-8 space-y-4 text-white">
                        {["Tudo do plano trimestral", "Acesso prioritário a novidades", "Área de membros exclusiva"].map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <Image src="https://s3.typebot.io/public/workspaces/cmj62bxvv000fju04wwudfwgk/typebots/cmjclddjn000kl204sjzbusjb/blocks/ngqxix0w0j29xfjugomz1zux?v=1766473357190" alt="Checkmark" width={24} height={24} className="h-6 w-6 flex-shrink-0" />
                            <span className="font-medium">{feature}</span>
                        </li>
                        ))}
                         <li className="flex items-center gap-2">
                           <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 text-primary px-3 py-1 text-sm font-medium">
                               58% de desconto
                           </div>
                        </li>
                    </ul>
                    
                    <Button 
                        size="lg" 
                        className="mt-10 w-full font-bold bg-white/5 border border-white/10 hover:bg-white/10"
                        onClick={() => window.location.href='https://pay.cakto.com.br/xy27qg8'}
                    >
                        Assinar Anual
                    </Button>
                </div>
            </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
