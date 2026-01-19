
'use client';

import { ArrowRight, FileText, LogOut, Briefcase, Search, Sparkles, Building2, Users, Copy, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import AuthGuard from '@/components/auth-guard';
import { useFirebase, useUser, useCollection, useDoc, useMemoFirebase } from '@/firebase';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Spotlight } from '@/components/ui/spotlight';
import React, { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { collection, doc, Timestamp, type DocumentReference, updateDoc, serverTimestamp } from 'firebase/firestore';
import { startOfDay, format, getDaysInMonth, eachDayOfInterval, endOfMonth } from 'date-fns';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Area, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"


// New Lead type for this page
type Lead = {
  id: string;
  createdAt: Timestamp;
  status: string;
  valorContrato: number;
};

type UserProfile = {
  plan?: string;
  isDemoAccount?: boolean;
  demoBalance?: number;
};

function Header({ userProfile }: { userProfile: UserProfile | null }) {
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
    <>
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
    </>
  );
}


function PainelContent() {
  const { user } = useUser();
  const { firestore } = useFirebase();

  const userProfileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const leadsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, `users/${user.uid}/leads`);
  }, [user, firestore]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);
  const { data: leads, isLoading: areLeadsLoading } = useCollection<Lead>(leadsQuery);
  const [chartData, setChartData] = useState<{ day: string; total: number }[]>([]);

  const leadsToday = useMemo(() => {
    if (!leads) return 0;
    const todayStart = startOfDay(new Date());
    return leads.filter(lead => lead.createdAt.toDate() >= todayStart).length;
  }, [leads]);

  useEffect(() => {
    // This effect will run only on the client, avoiding hydration mismatches.
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = endOfMonth(monthStart);
    const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
    const formattedMonthDays = monthDays.map(d => format(d, 'dd/MM'));

    // Wait until the user profile is loaded to decide which data to show.
    if (isProfileLoading) {
      return;
    }

    const isDemo = userProfile?.isDemoAccount;
    const demoBalanceValue = Number(userProfile?.demoBalance) || 0;

    let data;
    if (isDemo) {
        const totalBalance = demoBalanceValue || 50000;
        const daysInMonth = formattedMonthDays.length;
        
        // Generate random values and normalize them to sum up to totalBalance
        const randomValues = Array.from({ length: daysInMonth }, () => Math.random());
        const sumOfRandoms = randomValues.reduce((a, b) => a + b, 0);
        
        const normalizationFactor = sumOfRandoms > 0 ? totalBalance / sumOfRandoms : 0;
        const normalizedValues = randomValues.map(v => v * normalizationFactor);
        
        data = formattedMonthDays.map((day, index) => ({
            day: day,
            total: normalizedValues[index] || 0,
        }));
    } else {
        if (!leads) {
             data = formattedMonthDays.map(day => ({ day, total: 0 }));
        } else {
            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();

            const dailyGains = leads.reduce((acc, lead) => {
                if (lead.status !== 'Fechado') return acc;
                
                const leadDate = lead.createdAt.toDate();
                if (leadDate.getMonth() === currentMonth && leadDate.getFullYear() === currentYear) {
                    const day = format(leadDate, 'dd/MM');
                    acc[day] = (acc[day] || 0) + (lead.valorContrato || 0);
                }
                return acc;
            }, {} as Record<string, number>);

            data = formattedMonthDays.map(day => ({
                day,
                total: dailyGains[day] || 0,
            }));
        }
    }
    setChartData(data);
  }, [leads, userProfile, isProfileLoading]); // Rerun when data sources change

const chartConfig = {
    total: {
      label: "Ganhos",
      color: "hsl(var(--primary))",
    },
} as const;

const isLoadingChart = isProfileLoading || (!userProfile?.isDemoAccount && areLeadsLoading);


  return (
    <>
      <Header userProfile={userProfile} />
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
              className="group relative p-3 rounded-2xl overflow-hidden bg-background/50 border border-primary/20 transition-all duration-300 ease-in-out hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Spotlight
                  className="-top-20 -left-20 md:left-0 md:-top-10"
                  fill={'#a855f7'}
              />
              <div className="relative z-10 flex items-center justify-around gap-6 text-sm text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="text-base">🔥</span>
                  {areLeadsLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span><span className="font-bold text-white">{leadsToday}</span> Leads capturados hoje</span>
                  )}
                </div>
                <div className="h-4 w-px bg-zinc-700"></div>
                <div className="flex items-center gap-2">
                  <span className="text-base">⚡</span>
                  <span>Último uso: <span className="font-bold text-white">Scraper</span> (há 2h)</span>
                </div>
                <div className="h-4 w-px bg-zinc-700"></div>
                <div className="flex items-center gap-2">
                  <span className="text-base">💎</span>
                   {isProfileLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>Plano <span className="font-bold text-purple-400">{userProfile?.plan || '...'}</span> Ativo</span>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
               <Card className="bg-background/50 border-primary/20">
                  <CardHeader>
                      <CardTitle className="text-white">Ganhos do Mês</CardTitle>
                      <CardDescription className="text-white/50">Soma dos contratos fechados neste mês.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      {isLoadingChart ? (
                          <div className="flex items-center justify-center h-[250px]">
                              <Loader2 className="w-8 h-8 animate-spin text-primary" />
                          </div>
                      ) : (
                          <ChartContainer config={chartConfig} className="h-[250px] w-full">
                              <LineChart
                                accessibilityLayer
                                data={chartData}
                                margin={{
                                    top: 10,
                                    right: 10,
                                    left: -20,
                                    bottom: 0,
                                }}
                            >
                                <defs>
                                    <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="5%"
                                            stopColor="var(--color-total)"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="var(--color-total)"
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                                <XAxis
                                    dataKey="day"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    stroke="hsl(var(--foreground) / 0.5)"
                                />
                                 <YAxis
                                    stroke="hsl(var(--foreground) / 0.5)"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={10}
                                    tickFormatter={(value) => {
                                        const numValue = Number(value);
                                        if (numValue >= 1000) {
                                            return `R$${(numValue / 1000).toFixed(0)}k`;
                                        }
                                        return `R$${numValue}`;
                                    }}
                                />
                                <ChartTooltip
                                    cursor={{
                                        stroke: "hsl(var(--primary))",
                                        strokeWidth: 1,
                                        strokeDasharray: "3 3",
                                    }}
                                    content={<ChartTooltipContent
                                        formatter={(value) => `R$${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                                        indicator="dot" 
                                        wrapperClassName="bg-background/80 backdrop-blur-lg border border-primary/20 rounded-lg shadow-lg"
                                        labelClassName="text-white font-bold"
                                    />}
                                />
                                <Area
                                    dataKey="total"
                                    type="monotone"
                                    fill="url(#fillTotal)"
                                    fillOpacity={1}
                                    stroke="var(--color-total)"
                                    strokeWidth={2}
                                />
                            </LineChart>
                          </ChartContainer>
                      )}
                  </CardContent>
              </Card>
            </motion.div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <Link href="/scraper" passHref>
                <div
                  className="group relative p-6 rounded-2xl overflow-hidden h-full bg-background/50 border border-primary/20 transition-all duration-300 ease-in-out hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer"
                >
                  <Spotlight
                      className="-top-20 -left-20 md:left-0 md:-top-10"
                      fill={'#a855f7'}
                  />
                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                      Capitar Lead
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
              </Link>
               <Link href="/leads" passHref>
                <div
                  className="group relative p-6 rounded-2xl overflow-hidden h-full bg-background/50 border border-primary/20 transition-all duration-300 ease-in-out hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/20 cursor-pointer"
                >
                   <Spotlight
                      className="-top-20 -left-20 md:left-0 md:-top-10"
                      fill={'#f97316'}
                  />
                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                      Leads
                    </h2>
                    <p className="text-white/40 mt-2">
                      Gerencie e anote os contatos que você salvou.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                    Acessar Ferramenta
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                  <Briefcase className="absolute -right-8 -bottom-8 h-32 w-32 text-white/5 group-hover:text-orange-500/10 transition-colors duration-500"/>
                </div>
              </Link>
               <Link href="/contrato" passHref>
                <div
                  className="group relative p-6 rounded-2xl overflow-hidden h-full bg-background/50 border border-primary/20 transition-all duration-300 ease-in-out hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer"
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
              </Link>
               <Link href="/abordagem" passHref>
                <div
                   className="group relative p-6 rounded-2xl overflow-hidden h-full bg-background/50 border border-primary/20 transition-all duration-300 ease-in-out hover:border-yellow-500/40 hover:shadow-2xl hover:shadow-yellow-500/20 cursor-pointer"
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
              </Link>
            </div>
             <div className="grid grid-cols-1 gap-6">
                 <Link href="/prompt-builder" passHref>
                    <div
                      className="group relative p-6 rounded-2xl overflow-hidden h-full bg-background/50 border border-primary/20 transition-all duration-300 ease-in-out hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/20 cursor-pointer"
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
