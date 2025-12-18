
'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PainelPage() {
  return (
    <main className="p-4 md:p-10 min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-fuchsia-500/10 rounded-full mix-blend-normal filter blur-[96px] animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10">
        <motion.div
          className="relative z-10 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="text-center space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block"
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/60 pb-2">
                Bem-vindo ao seu Painel
              </h1>
            </motion.div>
            <motion.p
              className="text-lg text-white/50 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Escolha uma das ferramentas abaixo para começar.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 pt-8">
            <Link href="/scraper" passHref>
              <motion.div
                className="group relative backdrop-blur-xl bg-white/[0.02] rounded-2xl border border-white/[0.05] shadow-2xl p-8 cursor-pointer overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                    CLICKIFY
                  </h2>
                  <p className="text-white/40 mt-2">
                    Uma ferramenta de varredura para encontrar informações de estabelecimentos em qualquer cidade.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-end text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                  Acessar Ferramenta
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-violet-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
