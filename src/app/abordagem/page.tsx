
'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Copy, Check, Handshake, Store, UtensilsCrossed, Megaphone, Scale, Calculator, Building, Sparkles as SparklesIcon, Dumbbell, Code, Camera, Scissors, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from '@/components/ui/input';


const approachTemplates = [
    {
        category: 'Barbearia',
        icon: <Handshake className="w-5 h-5 text-yellow-400" />,
        message: `Olá, [Nome do Contato]! Meu nome é [Seu Nome].\n\nNotei a [Nome da Barbearia] e fiquei impressionado com o estilo de vocês. Tenho uma solução que ajuda barbearias a [Principal Problema que Resolve], resultando em [Benefício Principal].\n\nÉ algo como [Sua Solução em uma frase]. Nosso diferencial é [Seu Principal Diferencial].\n\nGostaria de agendar uma chamada rápida de 15 minutos para mostrar como podemos ajudar a [Nome da Barbearia] a crescer. O que acha?`
    },
    {
        category: 'Loja de Roupas',
        icon: <Store className="w-5 h-5 text-blue-400" />,
        message: `Oi, [Nome do Contato], tudo bem? Sou [Seu Nome].\n\nAdmiro muito o trabalho da [Nome da Loja]! Vi que vocês focam em [Estilo da Loja] e acredito que minha solução pode ser muito útil.\n\nNós ajudamos lojas como a sua a [Principal Problema que Resolve], o que leva a [Benefício Principal]. Fazemos isso através de [Sua Solução em uma frase].\n\nNosso principal diferencial é [Seu Principal Diferencial], e o objetivo é simples: [Seu Objetivo].\n\nSerá que teríamos 15 minutos na próxima semana para eu te apresentar a ideia?`
    },
    {
        category: 'Restaurante',
        icon: <UtensilsCrossed className="w-5 h-5 text-red-400" />,
        message: `Prezado(a) [Nome do Contato],\n\nMeu nome é [Seu Nome] e sou especialista em [Sua Área]. Acompanho o [Nome do Restaurante] e a qualidade de vocês é fantástica.\n\nTrabalho com uma solução que resolve o [Principal Problema que Resolve] para restaurantes, gerando [Benefício Principal]. Em resumo, nós [Sua Solução em uma frase].\n\nO que nos torna únicos é [Seu Principal Diferencial].\n\nMeu objetivo é agendar uma conversa de 15 minutos para explorar como podemos gerar mais resultados para o [Nome do Restaurante].\n\nQual o melhor dia e horário para você?`
    },
    {
        category: 'Agência de Marketing',
        icon: <Megaphone className="w-5 h-5 text-indigo-400" />,
        message: `Olá, [Nome do Contato], tudo bem? Sou [Seu Nome], especialista em [Sua Especialidade].\n\nAnalisando a presença online da [Nome da Agência], vi que vocês fazem um ótimo trabalho em [Área de Destaque da Agência].\n\nTenho uma ferramenta que ajuda agências a [Problema que Resolve], otimizando o [Processo Otimizado] e entregando [Benefício para o Cliente Final].\n\nSeria ótimo ter 15 minutos para mostrar como podemos agregar valor aos seus projetos. O que me diz?`
    },
    {
        category: 'Advocacia',
        icon: <Scale className="w-5 h-5 text-gray-400" />,
        message: `Dr(a). [Nome do Contato], boa tarde. Meu nome é [Seu Nome].\n\nEncontrei o escritório [Nome da Advocacia] e notei a especialização de vocês em [Área do Direito].\n\nDesenvolvemos uma solução que auxilia escritórios a [Problema que Resolve], garantindo mais [Benefício Principal, ex: segurança jurídica, eficiência].\n\nNossa plataforma [Sua Solução em uma frase]. Teria um breve momento na sua agenda para uma demonstração de como podemos otimizar o dia a dia do seu escritório?`
    },
    {
        category: 'Contabilidade',
        icon: <Calculator className="w-5 h-5 text-cyan-400" />,
        message: `Prezado(a) [Nome do Contato],\n\nSou [Seu Nome], e trabalho com soluções para escritórios de contabilidade.\n\nSei que a rotina na [Nome da Contabilidade] é corrida, e viemos para ajudar. Nossa ferramenta automatiza o [Processo que Automatiza], reduzindo o tempo gasto em tarefas manuais e minimizando erros.\n\nO resultado é [Benefício Principal]. Gostaria de apresentar nossa solução em 15 minutos. Qual o melhor momento para você?`
    },
    {
        category: 'Imobiliária',
        icon: <Building className="w-5 h-5 text-orange-400" />,
        message: `Olá, [Nome do Contato], como vai? Meu nome é [Seu Nome].\n\nSou especialista em tecnologia para o setor imobiliário e fiquei impressionado com os imóveis da [Nome da Imobiliária].\n\nNossa plataforma ajuda imobiliárias a [Principal Problema que Resolve], o que resulta em [Benefício, ex: mais leads qualificados, fechamentos mais rápidos].\n\nPodemos conversar por 15 minutos para que eu possa mostrar como podemos impulsionar as vendas da [Nome da Imobiliária]?`
    },
    {
        category: 'Clínica de Estética',
        icon: <SparklesIcon className="w-5 h-5 text-pink-400" />,
        message: `Oi, [Nome do Contato], tudo bem? Me chamo [Seu Nome].\n\nVi o trabalho incrível que vocês fazem na [Nome da Clínica] e admiro muito a qualidade dos procedimentos.\n\nNós temos uma solução que ajuda clínicas de estética a [Problema que Resolve, ex: gerenciar agendamentos, fidelizar clientes], aumentando o [Benefício, ex: faturamento, taxa de retorno].\n\nSeria um prazer apresentar a ferramenta em uma chamada rápida. Você teria um horário nesta semana?`
    },
    {
        category: 'Academia / Fitness',
        icon: <Dumbbell className="w-5 h-5 text-red-500" />,
        message: `Olá, [Nome do Contato]! Sou [Seu Nome] e vi que a [Nome da Academia] está com tudo!\n\nTenho uma plataforma que ajuda academias a [Problema, ex: reter alunos, gerenciar aulas], o que melhora a [Benefício, ex: experiência do membro, ocupação das aulas].\n\nCom nossa ferramenta, vocês conseguem [Sua Solução em uma frase].\n\nGostaria de mostrar como podemos ajudar a [Nome da Academia] a lotar as turmas. Tem 15 minutos disponíveis?`
    },
    {
        category: 'Desenvolvedor(a) Freelancer',
        icon: <Code className="w-5 h-5 text-green-400" />,
        message: `Fala, [Nome do Contato]! Beleza? Sou [Seu Nome], também sou dev.\n\nVi seu perfil no [Plataforma, ex: LinkedIn] e gostei muito dos seus projetos. Tenho uma ferramenta que pode te ajudar a [Problema que Resolve, ex: organizar tarefas, gerenciar clientes].\n\nEla basicamente [Sua Solução em uma frase], liberando mais tempo pra você focar no código.\n\nTopa fazer uma call rápida de 10 min pra eu te mostrar? Sem compromisso.`
    },
    {
        category: 'Fotógrafo(a)',
        icon: <Camera className="w-5 h-5 text-gray-300" />,
        message: `Olá, [Nome do Contato], tudo bem? Meu nome é [Seu Nome].\n\nSeu trabalho fotográfico é incrível, parabéns! Acompanho seu portfólio e a qualidade é sensacional.\n\nNós desenvolvemos uma plataforma que ajuda fotógrafos a [Problema que Resolve, ex: organizar galerias, vender fotos online], o que resulta em [Benefício, ex: mais vendas, melhor experiência para o cliente].\n\nQue tal 15 minutinhos para eu te mostrar como funciona? Acredito que pode otimizar muito seu fluxo.`
    },
    {
        category: 'Salão de Beleza',
        icon: <Scissors className="w-5 h-5 text-purple-400" />,
        message: `Oi, [Nome do Contato]! Sou [Seu Nome] e adoro o que vocês fazem no [Nome do Salão].\n\nTrabalho com uma solução que ajuda salões a [Problema, ex: diminuir faltas, lotar a agenda], aumentando o [Benefício, ex: faturamento mensal].\n\nÉ um sistema de [Sua Solução em uma frase] que encanta as clientes.\n\nSeria ótimo te apresentar a ideia em 15 minutos. Podemos marcar um horário?`
    }
];

const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
    const [copied, setCopied] = useState(false);
    const { toast } = useToast();

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        toast({
            title: "Texto Copiado!",
            description: "O modelo de abordagem foi copiado para sua área de transferência.",
        });
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <Button
            onClick={handleCopy}
            size="sm"
            className={cn(
                "bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300",
                copied && "bg-green-600 hover:bg-green-700"
            )}
        >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? 'Copiado!' : 'Copiar Texto'}
        </Button>
    );
}

export default function AbordagemPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTemplates = useMemo(() => {
        if (!searchTerm) {
            return approachTemplates;
        }
        return approachTemplates.filter(template =>
            template.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <main className="p-4 md:p-10 min-h-screen bg-black text-white relative overflow-hidden">
             <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="absolute -top-1/4 left-0 w-96 h-96 bg-green-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
                <div className="absolute -bottom-1/4 right-0 w-96 h-96 bg-green-500/20 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
            </div>

            <div className="w-full max-w-4xl mx-auto relative z-10 space-y-8">
                 <div className="absolute top-0 left-0">
                    <Link href="/painel" passHref>
                        <Button
                        variant="ghost"
                        className="text-white/70 hover:text-white hover:bg-white/10"
                        >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar ao Painel
                        </Button>
                    </Link>
                </div>
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="pt-16"
                >
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/60">
                            Modelos de Abordagem
                        </h1>
                        <p className="mt-2 text-zinc-400">Scripts prontos para você copiar e adaptar em sua prospecção.</p>
                    </div>

                     <motion.div 
                        className="p-6 space-y-6 bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                         <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                            <Input
                                placeholder="Pesquisar por tipo de negócio..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 bg-zinc-800/50 border-zinc-700 focus:border-purple-500"
                            />
                        </div>

                         <Accordion type="single" collapsible className="w-full">
                            {filteredTemplates.map((template, index) => (
                                 <AccordionItem key={index} value={`item-${index}`} className={cn("border-zinc-800", index === filteredTemplates.length - 1 && 'border-b-0')}>
                                    <AccordionTrigger className="hover:no-underline text-lg font-semibold text-zinc-200 hover:text-white transition-colors py-5">
                                        <div className="flex items-center gap-3">
                                            {template.icon}
                                            <span>{template.category}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-2">
                                        <div className="bg-zinc-900/50 p-4 rounded-md border border-zinc-700/50">
                                            <p className="whitespace-pre-wrap text-zinc-300 leading-relaxed font-mono text-sm">{template.message}</p>
                                            <div className="mt-4 flex justify-end">
                                               <CopyButton textToCopy={template.message} />
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                        {filteredTemplates.length === 0 && (
                            <div className="text-center py-10 text-zinc-500">
                                <p>Nenhum modelo encontrado para &quot;{searchTerm}&quot;.</p>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
}
