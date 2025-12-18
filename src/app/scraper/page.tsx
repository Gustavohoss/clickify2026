'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Loader2,
  AlertCircle,
  Phone,
  Globe,
  Clock,
  MapPin,
  ExternalLink,
  Send,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { GradientButton } from '@/components/ui/gradient-button';

type Resultado = {
  nome: string;
  endereco: string | null;
  horario: string | null;
  site: string | null;
  telefone: string | null;
};

export default function ScraperPage() {
  const [cidade, setCidade] = useState('');
  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const [filtrarComTelefone, setFiltrarComTelefone] = useState(false);
  const [filtrarComSite, setFiltrarComSite] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setResultados([]);
    setError(null);
    setSearched(true);

    try {
      const response = await fetch(
        `/api/scraper?busca=${encodeURIComponent(busca)}&cidade=${encodeURIComponent(cidade)}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha na busca.');
      }

      const result = await response.json();

      if (result && result.length > 0) {
        setResultados(result);
      } else {
        setError('Nenhum resultado encontrado para sua busca.');
      }
    } catch (err: any) {
      console.error('Erro:', err);
      setError(err.message || 'Falha ao se comunicar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  const resultadosFiltrados = useMemo(() => {
    return resultados.filter(item => {
      const temTelefone = !filtrarComTelefone || (filtrarComTelefone && item.telefone);
      const temSite = !filtrarComSite || (filtrarComSite && item.site);
      return temTelefone && temSite;
    });
  }, [resultados, filtrarComTelefone, filtrarComSite]);

  return (
    <main className="p-4 md:p-10 min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-fuchsia-500/10 rounded-full mix-blend-normal filter blur-[96px] animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10">
        <motion.div
          className="relative z-10 space-y-12"
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
              <h1 className="text-3xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/40 pb-1">
                CLICKIFY
              </h1>
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.div>
            <motion.p
              className="text-sm text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Digite uma cidade e o que você procura
            </motion.p>
          </div>

          <motion.div
            className="relative backdrop-blur-2xl bg-white/[0.02] rounded-2xl border border-white/[0.05] shadow-2xl"
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Cidade (ex: São Paulo)"
                  value={cidade}
                  onChange={e => setCidade(e.target.value)}
                  className="bg-black/50 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500 focus-visible:border-purple-500 transition-all duration-300"
                />
                <Input
                  placeholder="O que buscar? (ex: Barbearia)"
                  value={busca}
                  onChange={e => setBusca(e.target.value)}
                  className="bg-black/50 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500 focus-visible:border-purple-500 transition-all duration-300"
                />
              </div>

              {searched && resultados.length > 0 && (
                <div className="pt-2 flex items-center space-x-6 text-sm text-zinc-400">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="filtro-telefone" checked={filtrarComTelefone} onCheckedChange={(checked) => setFiltrarComTelefone(Boolean(checked))} className="border-zinc-600 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"/>
                        <Label htmlFor="filtro-telefone" className="cursor-pointer">Com Telefone</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="filtro-site" checked={filtrarComSite} onCheckedChange={(checked) => setFiltrarComSite(Boolean(checked))} className="border-zinc-600 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500" />
                        <Label htmlFor="filtro-site" className="cursor-pointer">Com Site</Label>
                    </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/[0.05] flex items-center justify-end">
              <GradientButton
                variant="variant"
                onClick={handleSearch}
                disabled={loading || !cidade || !busca}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-[spin_2s_linear_infinite]" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span className="ml-2">{loading ? 'Processando...' : 'INICIAR VARREDURA'}</span>
              </GradientButton>
            </div>
          </motion.div>
        </motion.div>
        
        <div className="mt-12">
            {error && (
                <Alert variant="destructive" className="mb-8 bg-red-900/20 border-red-800 text-red-300">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erro no Sistema</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {searched && !loading && !error && resultadosFiltrados.length === 0 && (
                <Alert className="mb-8 bg-zinc-900/50 border-zinc-800 text-zinc-300">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Sem Dados</AlertTitle>
                <AlertDescription>Nenhum resultado encontrado para a sua busca ou filtros selecionados.</AlertDescription>
                </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resultadosFiltrados.map((item, index) => (
                <Card
                    key={index}
                    className="bg-zinc-900/40 border-zinc-800/80 backdrop-blur-sm text-zinc-100 overflow-hidden hover:border-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-500 group relative"
                >
                    <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <CardHeader className="pb-3 border-b border-zinc-800/50 relative">
                    <CardTitle className="text-lg font-bold text-white tracking-tight truncate">{item.nome}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                    <div className="space-y-3 text-sm">
                        {item.endereco && (
                        <div className="flex items-start text-zinc-400">
                            <MapPin className="mr-3 h-4 w-4 shrink-0 mt-0.5 text-purple-500/70" />
                            <p className="line-clamp-2">{item.endereco}</p>
                        </div>
                        )}
                        {item.horario && (
                        <div className="flex items-start text-zinc-400">
                            <Clock className="mr-3 h-4 w-4 shrink-0 mt-0.5 text-purple-500/70" />
                            <p>{item.horario}</p>
                        </div>
                        )}
                        {item.site && (
                        <div className="flex items-start group/link">
                            <Globe className="mr-3 h-4 w-4 shrink-0 mt-0.5 text-purple-400" />
                            <a
                            href={item.site}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 transition-colors duration-300 break-all flex items-center gap-1 hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]"
                            >
                            <span className="truncate">{new URL(item.site).hostname.replace('www.', '')}</span>
                            <ExternalLink className="h-3 w-3 opacity-50 group-hover/link:opacity-100 transition-opacity" />
                            </a>
                        </div>
                        )}
                        {item.telefone && (
                        <div className="flex items-start text-zinc-400">
                            <Phone className="mr-3 h-4 w-4 shrink-0 mt-0.5 text-purple-500/70" />
                            <p className="font-mono">{item.telefone}</p>
                        </div>
                        )}
                    </div>
                    </CardContent>
                </Card>
                ))}
            </div>
        </div>

      </div>
    </main>
  );
}