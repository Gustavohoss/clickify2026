'use client';
import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useFirebase, useUser, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc, updateDoc, deleteDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
    MoreHorizontal,
    PlusCircle,
    Search,
    Loader2,
    AlertCircle,
    Trash2,
    Edit,
    FileDown,
    X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

type Lead = {
  id: string;
  nome: string;
  endereco: string | null;
  horario: string | null;
  site: string | null;
  telefone: string | null;
  notes: string;
  status: 'Novo' | 'Contatado' | 'Em Negociação' | 'Fechado' | 'Perdido';
  valorContrato: number;
  ultimaInteracao: Timestamp;
  createdAt: Timestamp;
};

// Componente para evitar erros de hidratação com datas
const ClientTime = ({ date }: { date: Timestamp | Date }) => {
    const [formattedDate, setFormattedDate] = useState('');
  
    useEffect(() => {
        const jsDate = date instanceof Timestamp ? date.toDate() : date;
        setFormattedDate(formatDistanceToNow(jsDate, { addSuffix: true, locale: ptBR }));
    }, [date]);
  
    if (!formattedDate) return <span className="text-zinc-500">...</span>;
  
    return <span>{formattedDate}</span>;
};


const statusColors = {
  'Novo': 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  'Contatado': 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
  'Em Negociação': 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20',
  'Fechado': 'bg-green-500/10 text-green-300 border-green-500/20',
  'Perdido': 'bg-red-500/10 text-red-300 border-red-500/20',
};

const EditLeadDialog = ({ lead, onSave }: { lead: Lead; onSave: () => void }) => {
    const [nome, setNome] = useState(lead.nome);
    const [status, setStatus] = useState(lead.status);
    const [valorContrato, setValorContrato] = useState(lead.valorContrato.toString());
    const [notes, setNotes] = useState(lead.notes);
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();
    const { firestore } = useFirebase();

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const leadRef = doc(firestore, `users/${lead.ownerId}/leads/${lead.id}`);
            await updateDoc(leadRef, {
                nome,
                status,
                valorContrato: Number(valorContrato) || 0,
                notes,
                ultimaInteracao: serverTimestamp(),
            });
            toast({ title: "Sucesso!", description: "Lead atualizado." });
            onSave();
        } catch (error) {
            toast({ title: "Erro", description: "Não foi possível atualizar o lead.", variant: "destructive" });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
            <DialogHeader>
                <DialogTitle>Editar Lead: {lead.nome}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <Input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" className="bg-zinc-800 border-zinc-700" />
                <Select value={status} onValueChange={(v) => setStatus(v as Lead['status'])}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-zinc-900 text-white border-zinc-800">
                        {Object.keys(statusColors).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Input type="number" value={valorContrato} onChange={(e) => setValorContrato(e.target.value)} placeholder="Valor do Contrato (R$)" className="bg-zinc-800 border-zinc-700" />
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anotações..." className="bg-zinc-800 border-zinc-700 rounded-md p-2 min-h-[100px]" />
            </div>
            <DialogFooter>
                <DialogClose asChild><Button variant="ghost">Cancelar</Button></DialogClose>
                <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Salvar
                </Button>
            </DialogFooter>
        </DialogContent>
    );
}

export default function LeadsPage() {
  const { user } = useUser();
  const { firestore } = useFirebase();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [openDialogs, setOpenDialogs] = useState<Record<string, boolean>>({});

  const leadsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, `users/${user.uid}/leads`);
  }, [user, firestore]);

  const { data: leads, isLoading, error } = useCollection<Lead>(leadsQuery as any);

  const filteredLeads = useMemo(() => {
    if (!leads) return [];
    return leads.filter(lead => {
      const searchMatch = lead.nome.toLowerCase().includes(searchTerm.toLowerCase());
      const statusMatch = statusFilter === 'Todos' || lead.status === statusFilter;
      return searchMatch && statusMatch;
    });
  }, [leads, searchTerm, statusFilter]);

  const handleDelete = async (leadId: string) => {
    if (!user) return;
    const leadRef = doc(firestore, `users/${user.uid}/leads/${leadId}`);
    try {
      await deleteDoc(leadRef);
      toast({ title: "Sucesso!", description: "Lead excluído." });
    } catch (e) {
      toast({ title: "Erro", description: "Não foi possível excluir o lead.", variant: "destructive" });
    }
  };
  
  const exportToCSV = () => {
    if (!filteredLeads.length) return;
    const headers = ['Nome', 'Status', 'Telefone', 'Site', 'Endereço', 'Valor Contrato', 'Anotações', 'Última Interação'];
    const rows = filteredLeads.map(lead => [
        `"${lead.nome || ''}"`,
        `"${lead.status || ''}"`,
        `"${lead.telefone || ''}"`,
        `"${lead.site || ''}"`,
        `"${(lead.endereco || '').replace(/"/g, '""')}"`,
        lead.valorContrato,
        `"${(lead.notes || '').replace(/"/g, '""')}"`,
        `"${lead.ultimaInteracao.toDate().toLocaleString()}"`
    ].join(','));

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="p-4 md:p-10 min-h-screen bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute -top-1/4 left-0 w-96 h-96 bg-orange-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
            <div className="absolute -bottom-1/4 right-0 w-96 h-96 bg-orange-500/20 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
        </div>

        <div className="w-full max-w-7xl mx-auto relative z-10 space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="pt-8"
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/60">
                            Gestão de Leads
                        </h1>
                        <p className="mt-2 text-zinc-400">Gerencie e anote os contatos que você salvou.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="bg-transparent border-orange-500/30 hover:bg-orange-500/10 text-orange-300" onClick={exportToCSV} disabled={!filteredLeads || filteredLeads.length === 0}>
                            <FileDown className="mr-2 h-4 w-4" />
                            Exportar CSV
                        </Button>
                        <Button className="bg-orange-600 hover:bg-orange-700" asChild>
                           <Link href="/scraper"><PlusCircle className="mr-2 h-4 w-4" /> Adicionar Lead</Link>
                        </Button>
                    </div>
                </div>

                <motion.div 
                    className="p-6 space-y-6 bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                            <Input
                                placeholder="Buscar por nome..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 bg-zinc-800/50 border-zinc-700 focus:border-orange-500"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full md:w-[180px] bg-zinc-800/50 border-zinc-700 focus:border-orange-500">
                                <SelectValue placeholder="Filtrar por status..." />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 text-white border-zinc-800">
                                <SelectItem value="Todos">Todos os Status</SelectItem>
                                {Object.keys(statusColors).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="overflow-x-auto">
                      <Table>
                          <TableHeader>
                              <TableRow className="border-zinc-800 hover:bg-zinc-900/40">
                                  <TableHead className="text-white">Nome</TableHead>
                                  <TableHead className="text-white">Status</TableHead>
                                  <TableHead className="text-white">Contato</TableHead>
                                  <TableHead className="text-white hidden md:table-cell">Última Interação</TableHead>
                                  <TableHead className="text-white hidden lg:table-cell">Valor (R$)</TableHead>
                                  <TableHead className="text-right text-white">Ações</TableHead>
                              </TableRow>
                          </TableHeader>
                          <TableBody>
                              {isLoading ? (
                                  <TableRow><TableCell colSpan={6} className="text-center"><Loader2 className="mx-auto h-6 w-6 animate-spin" /></TableCell></TableRow>
                              ) : error ? (
                                   <TableRow><TableCell colSpan={6} className="text-center text-red-400"><AlertCircle className="inline mr-2"/> {error.message}</TableCell></TableRow>
                              ) : filteredLeads.length > 0 ? (
                                  filteredLeads.map(lead => (
                                      <TableRow key={lead.id} className="border-zinc-800 hover:bg-zinc-900/40">
                                          <TableCell className="font-medium text-white">{lead.nome}</TableCell>
                                          <TableCell><Badge className={cn('text-xs', statusColors[lead.status])}>{lead.status}</Badge></TableCell>
                                          <TableCell>
                                              <div className="flex flex-col">
                                                  <span className="text-zinc-300">{lead.telefone || 'N/A'}</span>
                                                  {lead.site && <a href={lead.site} target="_blank" rel="noopener noreferrer" className="text-xs text-orange-400 hover:underline truncate">{lead.site}</a>}
                                              </div>
                                          </TableCell>
                                          <TableCell className="text-zinc-400 hidden md:table-cell"><ClientTime date={lead.ultimaInteracao} /></TableCell>
                                          <TableCell className="text-zinc-300 font-mono hidden lg:table-cell">{lead.valorContrato.toFixed(2)}</TableCell>
                                          <TableCell className="text-right">
                                              <Dialog open={openDialogs[lead.id]} onOpenChange={(open) => setOpenDialogs(prev => ({...prev, [lead.id]: open}))}>
                                                  <DialogTrigger asChild>
                                                       <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                                                  </DialogTrigger>
                                                  <EditLeadDialog lead={lead} onSave={() => setOpenDialogs(prev => ({...prev, [lead.id]: false}))} />
                                              </Dialog>
                                              <Button variant="ghost" size="icon" onClick={() => handleDelete(lead.id)}><Trash2 className="h-4 w-4 text-red-500/70 hover:text-red-500" /></Button>
                                          </TableCell>
                                      </TableRow>
                                  ))
                              ) : (
                                  <TableRow><TableCell colSpan={6} className="text-center text-zinc-500 py-10">Nenhum lead encontrado.</TableCell></TableRow>
                              )}
                          </TableBody>
                      </Table>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    </main>
  );
}