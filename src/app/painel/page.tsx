'use client';

import { ArrowRight, FileText, LogOut, Briefcase, Search, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AuthGuard from '@/components/auth-guard';
import { useFirebase, useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

function Header() {
  const { auth } = useFirebase();
  const { user } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    await auth.signOut();
    router.push('/login');
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-20 p-4 md:p-6 border-b border-white/10">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/60">
          CLICKIFY
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10 border-2 border-white/10">
                <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || ''} />
                <AvatarFallback className="bg-purple-800/60 text-white font-bold">
                  {getInitials(user?.displayName)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-black/80 backdrop-blur-lg border-zinc-800 text-white" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.displayName}</p>
                <p className="text-xs leading-none text-zinc-400">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="cursor-pointer focus:bg-zinc-800 focus:text-white"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}


function PainelContent() {
  const { user } = useUser();

  return (
    <>
      <Header />
      <main className="p-4 md:p-10 pt-28 md:pt-32 min-h-screen bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute -top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
          <div className="absolute -bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
        </div>

        <div className="w-full max-w-5xl mx-auto relative z-10">
          <motion.div
            className="relative z-10 space-y-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="text-left space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block"
              >
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/60 pb-2">
                  Bem-vindo, {user?.displayName?.split(' ')[0]}
                </h1>
              </motion.div>
              <motion.p
                className="text-lg text-white/50 max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Escolha uma das ferramentas abaixo para começar.
              </motion.p>
            </div>
            
            <motion.div 
              className="flex items-center gap-6 text-sm text-zinc-400 border border-zinc-800/80 rounded-lg p-3 bg-zinc-900/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
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
            </motion.div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <Link href="/scraper" passHref>
                <motion.div
                  className="group relative backdrop-blur-xl bg-white/[0.02] rounded-2xl border border-zinc-800 shadow-2xl p-8 cursor-pointer overflow-hidden hover:border-purple-500/50 transition-colors duration-300"
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 group-hover:text-purple-300 transition-colors">
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
                  <Search className="absolute -right-8 -bottom-8 h-32 w-32 text-white/5 group-hover:text-purple-500/10 transition-colors duration-500"/>
                </motion.div>
              </Link>
              <Link href="/leads" passHref>
                <motion.div
                  className="group relative backdrop-blur-xl bg-white/[0.02] rounded-2xl border border-zinc-800 shadow-2xl p-8 cursor-pointer overflow-hidden hover:border-green-500/50 transition-colors duration-300"
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 group-hover:text-green-300 transition-colors">
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
                  <Briefcase className="absolute -right-8 -bottom-8 h-32 w-32 text-white/5 group-hover:text-green-500/10 transition-colors duration-500"/>
                </motion.div>
              </Link>
            </div>
             <div className="grid grid-cols-1 gap-6">
                 <Link href="/prompt-builder" passHref>
                    <motion.div
                    className="group relative backdrop-blur-xl bg-white/[0.02] rounded-2xl border border-zinc-800 shadow-2xl p-8 cursor-pointer overflow-hidden hover:border-indigo-500/50 transition-colors duration-300"
                    whileHover={{ y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    >
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 group-hover:text-indigo-300 transition-colors">
                        Construtor de Prompts
                        </h2>
                        <p className="text-white/40 mt-2">
                        Crie um briefing de projeto detalhado respondendo a algumas perguntas.
                        </p>
                    </div>
                    <div className="mt-6 flex items-center text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                        Acessar Ferramenta
                        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                    <Sparkles className="absolute -right-8 -bottom-8 h-32 w-32 text-white/5 group-hover:text-indigo-500/10 transition-colors duration-500"/>
                    </motion.div>
                </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}

export default function PainelPage() {
    return (
        <AuthGuard>
            <PainelContent />
        </AuthGuard>
    );
}
