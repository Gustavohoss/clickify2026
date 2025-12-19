'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useFirebase, useUser, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc, updateDoc, serverTimestamp, DocumentReference } from 'firebase/firestore';
import AuthGuard from '@/components/auth-guard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Phone, Globe, Clock, MapPin, ExternalLink, Briefcase } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Lead = {
  id: string;
  nome: string;
  endereco: string | null;
  horario: string | null;
  site: string | null;
  telefone: string | null;
  notes: string;
  status: 'Não contatado' | 'Contatado' | 'Convertido' | 'Descartado';
};

const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
  
    return (...args: Parameters<F>): Promise<ReturnType<F>> =>
      new Promise(resolve => {
        if (timeout) {
          clearTimeout(timeout);
        }
  
        timeout = setTimeout(() => resolve(func(...args)), waitFor);
      });
};

function LeadCard({ lead }: { lead: Lead }) {
    const [notes, setNotes] = useState(lead.notes);
    const [status, setStatus] = useState(lead.status);
    const { firestore } = useFirebase();

    const leadDocRef = useMemo(() => {
        if (!firestore || !lead.id) return null;
        // This is not the right path. It needs the user ID.
        // But useUser() is not available here directly.
        // Assuming we get ownerId from lead data.
        return doc(firestore, `users/${lead.ownerId}/leads/${lead.id}`);
    }, [firestore, lead.id, lead.ownerId]);

    const debouncedUpdateNotes = useCallback(
        debounce((newNotes: string, docRef: DocumentReference) => {
          if (!docRef) return;
          updateDoc(docRef, { notes: newNotes, updatedAt: serverTimestamp() });
        }, 1000),
        []
    );

    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value);
        if(leadDocRef) {
            debouncedUpdateNotes(e.target.value, leadDocRef);
        }
    };
    
    const handleStatusChange = (newStatus: Lead['status']) => {
        setStatus(newStatus);
        if (!leadDocRef) return;
        updateDoc(leadDocRef, { status: newStatus, updatedAt: serverTimestamp() });
    };

    if (!lead.ownerId) {
        // This is a temporary fix. `ownerId` needs to be passed down.
        // This will be fixed in the next step.
        return null; 
    }

    return (
        <Card className="bg-zinc-900/40 border-zinc-800/80 backdrop-blur-sm text-zinc-100 overflow-hidden transition-all duration-500 group relative flex flex-col">
          <CardHeader className="pb-3 border-b border-zinc-800/50 relative flex flex-row justify-between items-center">
            <CardTitle className="text-lg font-bold text-white tracking-tight truncate">{lead.nome}</CardTitle>
            <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[180px] bg-black/50 border-zinc-700 focus:ring-green-500">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 text-white border-zinc-800">
                    <SelectItem value="Não contatado">Não contatado</SelectItem>
                    <SelectItem value="Contatado">Contatado</SelectItem>
                    <SelectItem value="Convertido">Convertido</SelectItem>
                    <SelectItem value="Descartado">Descartado</SelectItem>
                </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="pt-4 flex-grow flex flex-col gap-4">
            <div className="space-y-3 text-sm">
              {lead.endereco && (
                <div className="flex items-start text-zinc-400">
                  <MapPin className="mr-3 h-4 w-4 shrink-0 mt-0.5 text-green-500/70" />
                  <p className="line-clamp-2">{lead.endereco}</p>
                </div>
              )}
              {lead.horario && (
                <div className="flex items-start text-zinc-400">
                  <Clock className="mr-3 h-4 w-4 shrink-0 mt-0.5 text-green-500/70" />
                  <p>{lead.horario}</p>
                </div>
              )}
              {lead.site && (
                <div className="flex items-start group/link">
                  <Globe className="mr-3 h-4 w-4 shrink-0 mt-0.5 text-green-400" />
                  <a href={lead.site} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition-colors duration-300 break-all flex items-center gap-1 hover:drop-shadow-[0_0_8px_rgba(110,231,183,0.8)]">
                    <span className="truncate">{new URL(lead.site).hostname.replace('www.', '')}</span>
                    <ExternalLink className="h-3 w-3 opacity-50 group-hover/link:opacity-100 transition-opacity" />
                  </a>
                </div>
              )}
              {lead.telefone && (
                <div className="flex items-start text-zinc-400">
                  <Phone className="mr-3 h-4 w-4 shrink-0 mt-0.5 text-green-500/70" />
                  <p className="font-mono">{lead.telefone}</p>
                </div>
              )}
            </div>
            <Textarea
              placeholder="Suas anotações sobre este lead..."
              className="bg-black/50 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-green-500 flex-grow"
              value={notes}
              onChange={handleNotesChange}
            />
          </CardContent>
        </Card>
      );
}


function LeadsContent() {
    const { user } = useUser();
    const { firestore } = useFirebase();

    const leadsQuery = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return collection(firestore, `users/${user.uid}/leads`);
    }, [user, firestore]);

    const { data: leads, isLoading, error } = useCollection<Lead>(leadsQuery);

    return (
        <main className="p-4 md:p-10 min-h-screen bg-black text-white relative overflow-hidden">
             <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
            </div>

            <div className="w-full max-w-7xl mx-auto relative z-10">
                <motion.div
                    className="relative z-10 space-y-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <div className="text-center space-y-3">
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/60 pb-2"
                        >
                            Meus Leads Salvos
                        </motion.h1>
                        <motion.p
                            className="text-lg text-white/50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                           Gerencie os contatos que você capturou com o Scraper.
                        </motion.p>
                    </div>

                    {isLoading && (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="w-8 h-8 text-green-400 animate-spin" />
                        </div>
                    )}

                    {error && (
                        <Alert variant="destructive" className="mb-8 bg-red-900/20 border-red-800 text-red-300">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Erro ao Carregar Leads</AlertTitle>
                        <AlertDescription>{error.message}</AlertDescription>
                        </Alert>
                    )}

                    {!isLoading && !error && leads?.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-64 text-center bg-white/[0.02] rounded-2xl border border-dashed border-zinc-800">
                             <Briefcase className="w-12 h-12 text-zinc-600 mb-4"/>
                            <h3 className="text-xl font-bold text-white">Nenhum Lead Salvo</h3>
                            <p className="text-zinc-400 mt-2">Vá para o Scraper para começar a salvar leads.</p>
                        </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {leads?.map(lead => (
                            <LeadCard key={lead.id} lead={{...lead, ownerId: user?.uid}} />
                        ))}
                    </div>
                </motion.div>
            </div>
        </main>
    );
}

export default function LeadsPage() {
    return (
        <AuthGuard>
            <LeadsContent />
        </AuthGuard>
    )
}
