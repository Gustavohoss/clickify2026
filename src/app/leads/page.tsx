
'use client';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useFirebase, useUser, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc, updateDoc, serverTimestamp, Timestamp, addDoc, deleteDoc } from 'firebase/firestore';
import AuthGuard from '@/components/auth-guard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose, SheetFooter, SheetDescription } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { 
    Loader2, 
    Phone, 
    Globe, 
    Clock, 
    MapPin, 
    ArrowUp,
    Briefcase,
    Search,
    PlusCircle,
    MoreHorizontal,
    Edit,
    Trash2,
    Archive,
    DollarSign,
    Users,
    Activity,
    AlertCircle,
    FileDown
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Lead = {
  id: string;
  ownerId: string;
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

const leadSchema = z.object({
    nome: z.string().min(1, { message: 'O nome é obrigatório.' }),
    telefone: z.string().optional(),
    site: z.string().url({ message: 'URL do site inválida.' }).optional().or(z.literal('')),
    endereco: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

const statusConfig = {
    'Novo': { color: 'bg-blue-500/20 text-blue-300 border-blue-500/30', label: 'Novo' },
    'Contatado': { color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', label: 'Contatado' },
    'Em Negociação': { color: 'bg-orange-500/20 text-orange-300 border-orange-500/30', label: 'Em Negociação' },
    'Fechado': { color: 'bg-green-500/20 text-green-300 border-green-500/30', label: 'Fechado' },
    'Perdido': { color: 'bg-red-500/20 text-red-300 border-red-500/30', label: 'Perdido' },
};

const ClientTime = ({ date }: { date: Date | null | undefined }) => {
    const [timeAgo, setTimeAgo] = useState('');

    useEffect(() => {
        if (date) {
            setTimeAgo(formatDistanceToNow(date, { addSuffix: true, locale: ptBR }));
        } else {
            setTimeAgo('N/A');
        }
    }, [date]);

    if (!timeAgo) {
      return null;
    }

    return <>{timeAgo}</>;
};

const getInitials = (name: string) => {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};

const formatPhoneNumberForWhatsApp = (phone: string | null): string => {
    if (!phone) return '';
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10 || cleaned.length === 11) {
        cleaned = '55' + cleaned;
    }
    return `https://wa.me/${cleaned}`;
};

function LeadsContent() {
    const { user } = useUser();
    const { firestore } = useFirebase();
    const { toast } = useToast();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('Todos');
    const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
    const [editingLeadId, setEditingLeadId] = useState<string | null>(null);
    const [isNewLeadSheetOpen, setIsNewLeadSheetOpen] = useState(false);
    
    const form = useForm<LeadFormData>({
        resolver: zodResolver(leadSchema),
        defaultValues: {
            nome: '',
            telefone: '',
            site: '',
            endereco: '',
        }
    });

    const leadsQuery = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return collection(firestore, `users/${user.uid}/leads`);
    }, [user, firestore]);

    const { data: leads, isLoading, error } = useCollection<Lead>(leadsQuery);

    const filteredLeads = useMemo(() => {
        if (!leads) return [];
        return leads.filter(lead => {
            const matchesSearch = lead.nome.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'Todos' || lead.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [leads, searchQuery, statusFilter]);
    
    const kpis = useMemo(() => {
        if (!leads) return { total: 0, negociacao: 0, fechado: 0 };
        const fechadoValor = leads.reduce((acc, lead) => lead.status === 'Fechado' ? acc + (lead.valorContrato || 0) : acc, 0);
        return {
            total: leads.length,
            negociacao: leads.filter(l => l.status === 'Em Negociação').length,
            fechado: fechadoValor,
        }
    }, [leads]);

    const handleStatusChange = (leadId: string, newStatus: Lead['status']) => {
        if (!user || !firestore) return;
        const leadDocRef = doc(firestore, `users/${user.uid}/leads/${leadId}`);
        updateDoc(leadDocRef, { status: newStatus, ultimaInteracao: serverTimestamp() });
    };

    const handleValueChange = (leadId: string, newValue: number) => {
        if (!user || !firestore || isNaN(newValue)) return;
        const leadDocRef = doc(firestore, `users/${user.uid}/leads/${leadId}`);
        updateDoc(leadDocRef, { valorContrato: newValue, ultimaInteracao: serverTimestamp() });
    };

    const handleNotesChange = (leadId: string, newNotes: string) => {
        if (!user || !firestore) return;
        const leadDocRef = doc(firestore, `users/${user.uid}/leads/${leadId}`);
        updateDoc(leadDocRef, { notes: newNotes, ultimaInteracao: serverTimestamp() });
    };
    
    const handleSelectLead = (leadId: string) => {
        setSelectedLeads(prev => 
            prev.includes(leadId) ? prev.filter(id => id !== leadId) : [...prev, leadId]
        );
    };

    const handleSelectAll = () => {
        if (selectedLeads.length === filteredLeads.length) {
            setSelectedLeads([]);
        } else {
            setSelectedLeads(filteredLeads.map(lead => lead.id));
        }
    };

    const handleArchiveLead = (leadId: string) => {
        handleStatusChange(leadId, 'Perdido');
        toast({ title: "Lead Arquivado", description: "O lead foi movido para 'Perdido'." });
    }

    const handleDeleteLead = async (leadId: string) => {
        if (!user || !firestore) return;
        const leadDocRef = doc(firestore, `users/${user.uid}/leads/${leadId}`);
        try {
            await deleteDoc(leadDocRef);
            toast({ title: "Lead Excluído", description: "O lead foi removido permanentemente." });
        } catch (e) {
            toast({ variant: 'destructive', title: "Erro ao Excluir", description: "Não foi possível remover o lead." });
        }
    }
    
    const handleCreateNewLead = async (data: LeadFormData) => {
        if (!user || !firestore) return;

        try {
            await addDoc(collection(firestore, `users/${user.uid}/leads`), {
                ...data,
                ownerId: user.uid,
                notes: '',
                status: 'Novo',
                valorContrato: 0,
                ultimaInteracao: serverTimestamp(),
                createdAt: serverTimestamp(),
            });
            toast({ title: 'Lead Criado!', description: `${data.nome} foi adicionado com sucesso.` });
            setIsNewLeadSheetOpen(false);
            form.reset();
        } catch (error) {
            toast({ variant: 'destructive', title: 'Erro ao Criar Lead', description: 'Não foi possível criar o lead. Tente novamente.' });
        }
    };
    
    const handleExportCSV = () => {
        if (!filteredLeads || filteredLeads.length === 0) {
            toast({ variant: 'destructive', title: 'Nenhum lead para exportar', description: 'Filtre ou adicione leads antes de exportar.' });
            return;
        }

        const headers = ['Nome', 'Status', 'Telefone', 'Site', 'Endereço', 'ValorContrato', 'UltimaInteracao', 'CriadoEm', 'Anotacoes'];
        const csvRows = [headers.join(',')];

        filteredLeads.forEach(lead => {
            const row = [
                `"${lead.nome.replace(/"/g, '""')}"`,
                lead.status,
                lead.telefone || '',
                lead.site || '',
                `"${(lead.endereco || '').replace(/"/g, '""')}"`,
                lead.valorContrato || 0,
                lead.ultimaInteracao ? format(lead.ultimaInteracao.toDate(), 'yyyy-MM-dd HH:mm:ss') : '',
                lead.createdAt ? format(lead.createdAt.toDate(), 'yyyy-MM-dd HH:mm:ss') : '',
                `"${(lead.notes || '').replace(/"/g, '""')}"`
            ];
            csvRows.push(row.join(','));
        });

        const csvString = csvRows.join('\n');
        const blob = new Blob([`\uFEFF${csvString}`], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'leads.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        toast({ title: 'Exportação Iniciada', description: 'O download do seu arquivo CSV começará em breve.' });
    };


    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
    }
    
    return (
        <main className="p-4 md:p-10 min-h-screen bg-black text-white relative overflow-hidden">
             <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="absolute -top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
                <div className="absolute -bottom-1/4 right-0 w-96 h-96 bg-green-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
            </div>

            <div className="w-full max-w-7xl mx-auto relative z-10 space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="pt-8"
                >
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/60">
                            Gestão de Leads
                        </h1>
                        <div className="flex items-center gap-4">
                            <Button variant="outline" onClick={handleExportCSV} className="bg-transparent border-zinc-700 hover:bg-zinc-800"><FileDown className="mr-2 h-4 w-4"/>Exportar CSV</Button>
                            
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="bg-purple-600 hover:bg-purple-700"><PlusCircle className="mr-2 h-4 w-4"/> Novo Lead</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-black/80 backdrop-blur-lg border-zinc-800 text-white" align="end">
                                    <DropdownMenuItem onSelect={() => router.push('/scraper')} className="cursor-pointer focus:bg-zinc-800 focus:text-white">
                                        <Search className="mr-2 h-4 w-4" />
                                        <span>Achar com o Scraper</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => setIsNewLeadSheetOpen(true)} className="cursor-pointer focus:bg-zinc-800 focus:text-white">
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        <span>Adicionar Manualmente</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Sheet open={isNewLeadSheetOpen} onOpenChange={setIsNewLeadSheetOpen}>
                                <SheetContent className="bg-black border-zinc-800 text-white w-full sm:max-w-md overflow-y-auto z-[102]">
                                    <SheetHeader>
                                        <SheetTitle>Criar Novo Lead</SheetTitle>
                                        <SheetDescription>Preencha as informações abaixo para adicionar um novo lead.</SheetDescription>
                                    </SheetHeader>
                                    <form onSubmit={form.handleSubmit(handleCreateNewLead)} className="space-y-4 py-6">
                                        <div className="space-y-2">
                                            <label htmlFor="nome">Nome da Empresa</label>
                                            <Input id="nome" {...form.register('nome')} className="bg-zinc-900 border-zinc-700"/>
                                            {form.formState.errors.nome && <p className="text-red-500 text-xs">{form.formState.errors.nome.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="telefone">Telefone</label>
                                            <Input id="telefone" {...form.register('telefone')} className="bg-zinc-900 border-zinc-700"/>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="site">Site</label>
                                            <Input id="site" {...form.register('site')} className="bg-zinc-900 border-zinc-700"/>
                                            {form.formState.errors.site && <p className="text-red-500 text-xs">{form.formState.errors.site.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="endereco">Endereço</label>
                                            <Input id="endereco" {...form.register('endereco')} className="bg-zinc-900 border-zinc-700"/>
                                        </div>
                                        <SheetFooter>
                                            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full bg-purple-600 hover:bg-purple-700">
                                                {form.formState.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin"/> : 'Salvar Lead'}
                                            </Button>
                                        </SheetFooter>
                                    </form>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card className="bg-zinc-900/40 border-zinc-800/80 backdrop-blur-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-zinc-400">Total de Leads</CardTitle>
                                <div className="p-2 rounded-full bg-blue-500/10"><Users className="h-4 w-4 text-blue-400" /></div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">{isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : kpis.total}</div>
                                <p className="text-xs text-zinc-500 mt-1">Nenhum lead novo este mês</p>
                            </CardContent>
                        </Card>
                         <Card className="bg-zinc-900/40 border-zinc-800/80 backdrop-blur-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-zinc-400">Em Negociação</CardTitle>
                                 <div className="p-2 rounded-full bg-orange-500/10"><Activity className="h-4 w-4 text-orange-400" /></div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">{isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : kpis.negociacao}</div>
                                 <p className="text-xs text-zinc-500 mt-1">+2 na última semana</p>
                            </CardContent>
                        </Card>
                         <Card className="bg-zinc-900/40 border-zinc-800/80 backdrop-blur-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-zinc-400">Contratos Fechados</CardTitle>
                                <div className="p-2 rounded-full bg-green-500/10"><DollarSign className="h-4 w-4 text-green-400" /></div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-400">{isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : formatCurrency(kpis.fechado)}</div>
                                <p className="text-xs text-green-500 mt-1 flex items-center"><ArrowUp className="w-3 h-3 mr-1"/> 12% vs. mês passado</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                            <Input placeholder="Buscar lead..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-purple-500"/>
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px] bg-zinc-900/50 border-zinc-800 focus:ring-purple-500">
                                <SelectValue placeholder="Filtrar por Status" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 text-white border-zinc-800">
                                <SelectItem value="Todos">Todos</SelectItem>
                                {Object.keys(statusConfig).map(status => (
                                    <SelectItem key={status} value={status}>{status}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                </motion.div>
                
                <Card className="bg-zinc-900/40 border-zinc-800/80 backdrop-blur-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-zinc-800 hover:bg-zinc-900/50">
                                <TableHead className="w-12">
                                    <Checkbox 
                                        checked={filteredLeads.length > 0 && selectedLeads.length === filteredLeads.length}
                                        onCheckedChange={handleSelectAll}
                                    />
                                </TableHead>
                                <TableHead className="text-white">Empresa</TableHead>
                                <TableHead className="text-white">Contato</TableHead>
                                <TableHead className="text-white">Status</TableHead>
                                <TableHead className="text-white text-right">Valor do Contrato</TableHead>
                                <TableHead className="text-white">Última Interação</TableHead>
                                <TableHead className="text-white">Anotações</TableHead>
                                <TableHead className="text-right text-white">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                             {isLoading && (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center h-24">
                                        <Loader2 className="w-6 h-6 text-purple-400 animate-spin mx-auto" />
                                    </TableCell>
                                </TableRow>
                            )}
                            {error && (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center h-24 text-red-400">
                                        <div className="flex justify-center items-center gap-2">
                                            <AlertCircle className="w-5 h-5"/>
                                            <span>Erro ao carregar os leads.</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                             {!isLoading && !error && filteredLeads.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center h-24 text-zinc-400">
                                        <Briefcase className="w-8 h-8 text-zinc-600 mx-auto mb-2"/>
                                        Nenhum lead encontrado.
                                    </TableCell>
                                </TableRow>
                            )}
                            {filteredLeads.map(lead => (
                                <TableRow key={lead.id} className="border-zinc-800 hover:bg-zinc-900/30">
                                    <TableCell>
                                        <Checkbox 
                                            checked={selectedLeads.includes(lead.id)}
                                            onCheckedChange={() => handleSelectLead(lead.id)}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <Sheet open={editingLeadId === lead.id} onOpenChange={(isOpen) => !isOpen && setEditingLeadId(null)}>
                                            <SheetTrigger asChild>
                                                 <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setEditingLeadId(lead.id)}>
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarFallback className="bg-purple-800/60 text-white text-xs font-bold">
                                                            {getInitials(lead.nome)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-white font-bold group-hover:text-purple-400 transition-colors">{lead.nome}</span>
                                                 </div>
                                            </SheetTrigger>
                                            <SheetContent className="bg-black border-zinc-800 text-white w-full sm:max-w-md overflow-y-auto z-[102]">
                                                <SheetHeader>
                                                    <SheetTitle className="text-2xl text-white">{lead.nome}</SheetTitle>
                                                </SheetHeader>
                                                <div className="py-6 space-y-4">
                                                    {lead.endereco && <p className="flex items-center gap-2 text-zinc-400"><MapPin size={16}/> {lead.endereco}</p>}
                                                    {lead.telefone && <p className="flex items-center gap-2 text-zinc-400"><Phone size={16}/> {lead.telefone}</p>}
                                                    {lead.site && <a href={lead.site} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-purple-400 hover:text-purple-300"><Globe size={16}/> {lead.site}</a>}
                                                    {lead.horario && <p className="flex items-center gap-2 text-zinc-400"><Clock size={16}/> {lead.horario}</p>}
                                                </div>
                                                <Textarea 
                                                    defaultValue={lead.notes} 
                                                    onBlur={(e) => handleNotesChange(lead.id, e.target.value)}
                                                    placeholder="Anotações sobre o lead..."
                                                    className="bg-zinc-900 border-zinc-700 min-h-[200px]"
                                                />
                                                 <SheetFooter>
                                                    <SheetClose asChild>
                                                        <Button className="mt-4 w-full bg-purple-600 hover:bg-purple-700">Fechar</Button>
                                                    </SheetClose>
                                                </SheetFooter>
                                            </SheetContent>
                                        </Sheet>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <a href={formatPhoneNumberForWhatsApp(lead.telefone)} target="_blank" rel="noopener noreferrer" className={!lead.telefone ? 'pointer-events-none' : ''}>
                                                <Phone size={16} className={lead.telefone ? 'text-green-400 hover:text-green-300' : 'text-zinc-600'}/>
                                            </a>
                                            <a href={lead.site || '#'} target="_blank" rel="noopener noreferrer" className={!lead.site ? 'pointer-events-none' : ''}>
                                                <Globe size={16} className={lead.site ? 'text-blue-400 hover:text-blue-300' : 'text-zinc-600'}/>
                                            </a>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Select value={lead.status} onValueChange={(val: Lead['status']) => handleStatusChange(lead.id, val)}>
                                            <SelectTrigger className={`w-[150px] border-0 focus:ring-0 ${statusConfig[lead.status]?.color}`}>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-900 text-white border-zinc-800">
                                                 {Object.entries(statusConfig).map(([key, config]) => (
                                                    <SelectItem key={key} value={key}>{config.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="relative">
                                            <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                            <Input 
                                                type="number" 
                                                defaultValue={lead.valorContrato || 0}
                                                onBlur={(e) => handleValueChange(lead.id, parseFloat(e.target.value))}
                                                className="w-28 pl-7 bg-transparent border-transparent text-right hover:border-zinc-700 focus:border-purple-500"
                                                disabled={lead.status !== 'Fechado'}
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-zinc-400">
                                       <ClientTime date={lead.ultimaInteracao?.toDate()} />
                                     </TableCell>
                                     <TableCell className="text-zinc-400 truncate max-w-[150px]">
                                        {lead.notes || '-'}
                                     </TableCell>
                                    <TableCell className="text-right">
                                        <AlertDialog>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4"/>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-zinc-900 text-white border-zinc-800">
                                                    <DropdownMenuItem onSelect={() => setEditingLeadId(lead.id)} className="cursor-pointer focus:bg-zinc-800 focus:text-white"><Edit className="mr-2 h-4 w-4"/> Editar</DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => handleArchiveLead(lead.id)} className="cursor-pointer focus:bg-zinc-800 focus:text-white"><Archive className="mr-2 h-4 w-4"/> Arquivar</DropdownMenuItem>
                                                    <AlertDialogTrigger asChild>
                                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-400 focus:bg-red-900/50 focus:text-red-300 cursor-pointer"><Trash2 className="mr-2 h-4 w-4"/> Excluir</DropdownMenuItem>
                                                    </AlertDialogTrigger>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white">
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                                                    <AlertDialogDescription className="text-zinc-400">
                                                        Esta ação não pode ser desfeita. Isso excluirá permanentemente o lead &quot;{lead.nome}&quot;.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel className="border-zinc-700 hover:bg-zinc-800">Cancelar</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDeleteLead(lead.id)} className="bg-red-600 hover:bg-red-700">Excluir</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
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
