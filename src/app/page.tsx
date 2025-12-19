'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Footer } from '@/components/ui/footer-section';
import { Header } from '@/components/landing/header';
import { GradientButton } from '@/components/ui/gradient-button';
import Safari_01 from "@/components/ui/safari-01";
import { SparklesCore } from '@/components/ui/sparkles';

export default function LandingPage() {
  return (
    <div className="bg-black text-white">
      <Header />
      <main className="p-4 md:p-25 pt-40 min-h-screen relative overflow-hidden flex justify-center">
        <div className="w-full absolute inset-0 h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
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
              <div className="shadow-[0_0_40px_10px_rgba(192,132,252,0.2)] rounded-2xl w-full">
                <Safari_01 />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
