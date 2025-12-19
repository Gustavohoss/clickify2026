'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Footer } from '@/components/ui/footer-section';
import { Header } from '@/components/landing/header';
import { GradientButton } from '@/components/ui/gradient-button';

export default function LandingPage() {
  return (
    <div className="bg-black text-white">
      <Header />
      <main className="p-4 md:p-10 min-h-screen relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
          <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-fuchsia-500/10 rounded-full mix-blend-normal filter blur-[96px] animate-pulse delay-1000" />
        </div>

        <div className="w-full max-w-4xl mx-auto relative z-10 text-center">
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
            >
              <Link href="/login" passHref>
                <GradientButton variant="variant" asChild>
                  <motion.div
                    className="group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Assinar agora</span>
                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </GradientButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
