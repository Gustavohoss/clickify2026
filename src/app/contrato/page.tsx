
'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChevronLeft,
  ChevronRight,
  Clipboard,
  Check,
  FileText,
  Users,
  Briefcase,
  Calendar,
  CircleDollarSign,
  ArrowLeft,
  Sparkles,
  FileDown,
  Loader2
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { GradientButton } from '@/components/ui/gradient-button';
import jsPDF from 'jspdf';

const steps = [
  { id: '01', name: 'Informações das Partes', icon: Users },
  { id: '02', name: 'Escopo do Serviço', icon: Briefcase },
  { id: '03', name: 'Valores e Pagamento', icon: CircleDollarSign },
  { id: '04', name: 'Prazos e Vigência', icon: Calendar },
  { id: '05', name: 'Gerar Contrato', icon: FileText },
];

const formSchema = z.object({
  // Step 1
  contratanteNome: z.string().min(1, 'Campo obrigatório'),
  contratanteDocumento: z.string().min(1, 'Campo obrigatório'),
  contratanteEndereco: z.string().min(1, 'Campo obrigatório'),
  contratadoNome: z.string().min(1, 'Campo obrigatório'),
  contratadoDocumento: z.string().min(1, 'Campo obrigatório'),
  contratadoEndereco: z.string().min(1, 'Campo obrigatório'),
  // Step 2
  escopo: z.string().min(1, 'Campo obrigatório'),
  // Step 3
  valor: z.string().min(1, 'Campo obrigatório'),
  formaPagamento: z.string().min(1, 'Campo obrigatório'),
  // Step 4
  prazo: z.string().min(1, 'Campo obrigatório'),
  dataInicio: z.string().min(1, 'Campo obrigatório'),
});

type FormData = z.infer<typeof formSchema>;


export default function ContratoPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const { formState: { errors } } = methods;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const showFinalStep = () => {
    setCurrentStep(steps.length - 1);
  };

  const downloadPdf = async () => {
    setIsDownloading(true);
    try {
        const data = methods.getValues();
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4'
        });

        const margin = 20;
        const usableWidth = pdf.internal.pageSize.getWidth() - margin * 2;
        let currentY = margin;

        pdf.setFontSize(14);
        pdf.setFont('Helvetica', 'bold');
        pdf.text('CONTRATO DE PRESTAÇÃO DE SERVIÇOS', pdf.internal.pageSize.getWidth() / 2, currentY, { align: 'center' });
        currentY += 15;

        pdf.setFontSize(11);
        pdf.setFont('Helvetica', 'normal');

        // --- PARTES ENVOLVIDAS ---
        pdf.setFont('Helvetica', 'bold');
        pdf.text('1. DAS PARTES', margin, currentY);
        currentY += 8;

        pdf.setFont('Helvetica', 'normal');
        let contratanteText = `CONTRATANTE: ${data.contratanteNome}, devidamente inscrita no CPF/CNPJ sob o nº ${data.contratanteDocumento}, com sede em ${data.contratanteEndereco}.`;
        let splitContratante = pdf.splitTextToSize(contratanteText, usableWidth);
        pdf.text(splitContratante, margin, currentY);
        currentY += (splitContratante.length * 5) + 5;

        let contratadoText = `CONTRATADO: ${data.contratadoNome}, devidamente inscrito no CPF/CNPJ sob o nº ${data.contratadoDocumento}, com sede em ${data.contratadoEndereco}.`;
        let splitContratado = pdf.splitTextToSize(contratadoText, usableWidth);
        pdf.text(splitContratado, margin, currentY);
        currentY += (splitContratado.length * 5) + 10;
        
        // --- OBJETO ---
        pdf.setFont('Helvetica', 'bold');
        pdf.text('2. DO OBJETO DO CONTRATO', margin, currentY);
        currentY += 8;
        
        pdf.setFont('Helvetica', 'normal');
        let objetoText = `Cláusula 2.1. O presente contrato tem como objeto a prestação dos seguintes serviços pelo CONTRATADO em favor da CONTRATANTE: ${data.escopo}.`;
        let splitObjeto = pdf.splitTextToSize(objetoText, usableWidth);
        pdf.text(splitObjeto, margin, currentY);
        currentY += (splitObjeto.length * 5) + 10;

        // --- VALOR E PAGAMENTO ---
        pdf.setFont('Helvetica', 'bold');
        pdf.text('3. DO VALOR E DA FORMA DE PAGAMENTO', margin, currentY);
        currentY += 8;
        
        pdf.setFont('Helvetica', 'normal');
        let valorText = `Cláusula 3.1. Pela prestação dos serviços, a CONTRATANTE pagará ao CONTRATADO o valor de R$ ${data.valor}, através de ${data.formaPagamento}.`;
        let splitValor = pdf.splitTextToSize(valorText, usableWidth);
        pdf.text(splitValor, margin, currentY);
        currentY += (splitValor.length * 5) + 10;

        // --- PRAZOS E VIGÊNCIA ---
        pdf.setFont('Helvetica', 'bold');
        pdf.text('4. DO PRAZO E VIGÊNCIA', margin, currentY);
        currentY += 8;
        
        pdf.setFont('Helvetica', 'normal');
        let prazoText = `Cláusula 4.1. O presente contrato terá vigência de ${data.prazo}, com início em ${data.dataInicio}.`;
        let splitPrazo = pdf.splitTextToSize(prazoText, usableWidth);
        pdf.text(splitPrazo, margin, currentY);
        currentY += (splitPrazo.length * 5) + 20;

        // --- ASSINATURAS ---
        currentY = pdf.internal.pageSize.getHeight() - 40;
        pdf.text('________________________________', margin, currentY);
        pdf.text(data.contratanteNome, margin, currentY + 6);
        pdf.text('CONTRATANTE', margin, currentY + 11);

        const contratadoX = pdf.internal.pageSize.getWidth() - margin - pdf.getTextWidth('________________________________');
        pdf.text('________________________________', contratadoX, currentY);
        pdf.text(data.contratadoNome, contratadoX, currentY + 6);
        pdf.text('CONTRATADO', contratadoX, currentY + 11);


        pdf.save('contrato.pdf');
    } catch (error) {
        console.error("Erro ao gerar PDF:", error);
    } finally {
        setIsDownloading(false);
    }
  };


  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div>
                <h3 className="font-semibold text-white text-lg">Informações da Contratante</h3>
                <p className="text-zinc-400 text-sm">Dados da sua empresa ou pessoa física.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contratanteNome" className="text-zinc-300">Nome Completo / Razão Social</Label>
                <Input {...methods.register('contratanteNome')} id="contratanteNome" className="bg-zinc-800/80 border-zinc-700" />
                 {errors.contratanteNome && <p className="text-red-400 text-xs">{errors.contratanteNome.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="contratanteDocumento" className="text-zinc-300">CPF / CNPJ</Label>
                <Input {...methods.register('contratanteDocumento')} id="contratanteDocumento" className="bg-zinc-800/80 border-zinc-700" />
                 {errors.contratanteDocumento && <p className="text-red-400 text-xs">{errors.contratanteDocumento.message}</p>}
              </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="contratanteEndereco" className="text-zinc-300">Endereço Completo</Label>
                <Input {...methods.register('contratanteEndereco')} id="contratanteEndereco" className="bg-zinc-800/80 border-zinc-700" />
                 {errors.contratanteEndereco && <p className="text-red-400 text-xs">{errors.contratanteEndereco.message}</p>}
              </div>

            <hr className="border-zinc-800" />

            <div>
                <h3 className="font-semibold text-white text-lg">Informações da Contratada</h3>
                <p className="text-zinc-400 text-sm">Dados do seu cliente.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contratadoNome" className="text-zinc-300">Nome Completo / Razão Social</Label>
                <Input {...methods.register('contratadoNome')} id="contratadoNome" className="bg-zinc-800/80 border-zinc-700" />
                {errors.contratadoNome && <p className="text-red-400 text-xs">{errors.contratadoNome.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="contratadoDocumento" className="text-zinc-300">CPF / CNPJ</Label>
                <Input {...methods.register('contratadoDocumento')} id="contratadoDocumento" className="bg-zinc-800/80 border-zinc-700" />
                 {errors.contratadoDocumento && <p className="text-red-400 text-xs">{errors.contratadoDocumento.message}</p>}
              </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="contratadoEndereco" className="text-zinc-300">Endereço Completo</Label>
                <Input {...methods.register('contratadoEndereco')} id="contratadoEndereco" className="bg-zinc-800/80 border-zinc-700" />
                 {errors.contratadoEndereco && <p className="text-red-400 text-xs">{errors.contratadoEndereco.message}</p>}
              </div>
          </motion.div>
        );
      case 1:
        return (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                    <h3 className="font-semibold text-white text-lg">Objeto do Contrato</h3>
                    <p className="text-zinc-400 text-sm">Descreva detalhadamente os serviços que serão prestados.</p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="escopo" className="text-zinc-300">Descrição dos Serviços</Label>
                    <Textarea {...methods.register('escopo')} id="escopo" className="bg-zinc-800/80 border-zinc-700 min-h-[200px]" />
                    {errors.escopo && <p className="text-red-400 text-xs">{errors.escopo.message}</p>}
                </div>
           </motion.div>
        );
       case 2:
        return (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                 <div>
                    <h3 className="font-semibold text-white text-lg">Valores e Condições de Pagamento</h3>
                    <p className="text-zinc-400 text-sm">Defina os detalhes financeiros do contrato.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="valor" className="text-zinc-300">Valor Total (R$)</Label>
                        <Input {...methods.register('valor')} id="valor" type="number" placeholder="2500,00" className="bg-zinc-800/80 border-zinc-700" />
                         {errors.valor && <p className="text-red-400 text-xs">{errors.valor.message}</p>}
                    </div>
                    <div className="space-y-2">
                         <Label htmlFor="formaPagamento" className="text-zinc-300">Forma de Pagamento</Label>
                        <Select onValueChange={(value) => methods.setValue('formaPagamento', value)} defaultValue={methods.getValues('formaPagamento')}>
                            <SelectTrigger className="bg-zinc-800/80 border-zinc-700 text-white"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                            <SelectContent className="bg-zinc-900 text-white border-zinc-800">
                                <SelectItem value="Pix">Pix</SelectItem>
                                <SelectItem value="Boleto Bancário">Boleto Bancário</SelectItem>
                                <SelectItem value="Transferência Bancária (TED/DOC)">Transferência Bancária (TED/DOC)</SelectItem>
                                <SelectItem value="Cartão de Crédito">Cartão de Crédito</SelectItem>
                            </SelectContent>
                        </Select>
                         {errors.formaPagamento && <p className="text-red-400 text-xs">{errors.formaPagamento.message}</p>}
                    </div>
                </div>
           </motion.div>
        );
    case 3:
        return (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                    <h3 className="font-semibold text-white text-lg">Prazos e Vigência</h3>
                    <p className="text-zinc-400 text-sm">Estabeleça o cronograma e a duração do contrato.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="prazo" className="text-zinc-300">Prazo de Vigência</Label>
                        <Input {...methods.register('prazo')} id="prazo" placeholder="Ex: 12 meses, Indeterminado" className="bg-zinc-800/80 border-zinc-700" />
                         {errors.prazo && <p className="text-red-400 text-xs">{errors.prazo.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="dataInicio" className="text-zinc-300">Data de Início</Label>
                        <Input {...methods.register('dataInicio')} id="dataInicio" type="date" className="bg-zinc-800/80 border-zinc-700" />
                        {errors.dataInicio && <p className="text-red-400 text-xs">{errors.dataInicio.message}</p>}
                    </div>
                </div>
            </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center border-2 border-green-500/30">
                <FileText className="w-10 h-10 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">Contrato Pronto para Download</h3>
            <p className="text-zinc-400 max-w-sm">
                Todas as informações foram preenchidas. Clique no botão abaixo para baixar o seu contrato em formato PDF.
            </p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="p-4 md:p-10 min-h-screen bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
        </div>
         <div className="w-full max-w-4xl mx-auto relative z-10">
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

            <div className="text-center my-12 pt-8 space-y-2">
                <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/60">
                    Assistente de Geração de Contratos
                </h1>
                <p className="text-zinc-400">Preencha as informações para criar um contrato profissional com IA.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-12">
                <nav className="hidden md:block">
                    <ol className="space-y-4">
                    {steps.map((step, index) => (
                        <li key={step.name} className="relative">
                        <div className="flex items-center space-x-3">
                            <div
                            className={cn(
                                `h-10 w-10 rounded-full flex items-center justify-center transition-colors`,
                                currentStep > index && 'text-white gradient-step-icon-completed',
                                currentStep === index && 'text-white gradient-step-icon shadow-[0_0_15px_rgba(168,85,247,0.5)]',
                                currentStep < index && 'bg-zinc-800 border border-zinc-700 text-zinc-400'
                            )}
                            >
                            {currentStep > index ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                            </div>
                            <span className={`font-medium transition-colors ${currentStep >= index ? 'text-white' : 'text-zinc-500'}`}>{step.name}</span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`absolute left-5 top-11 h-full w-px bg-zinc-800 transition-all ${currentStep > index ? 'bg-purple-500' : ''}`} style={{height: 'calc(100% - 1rem)'}}/>
                        )}
                        </li>
                    ))}
                    </ol>
                </nav>

                <FormProvider {...methods}>
                    <form onSubmit={(e) => { e.preventDefault(); methods.handleSubmit(showFinalStep)(); }} className="backdrop-blur-xl bg-white/[0.02] rounded-2xl border border-white/[0.05] shadow-2xl p-8 min-h-[500px]">
                         <AnimatePresence mode="wait">
                            <motion.div key={currentStep}>
                                {renderStep()}
                            </motion.div>
                        </AnimatePresence>
                    </form>
                </FormProvider>
            </div>
             <div className="mt-8 flex justify-between">
                <Button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    variant="ghost"
                    className="text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-50"
                >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Anterior
                </Button>

                {currentStep < steps.length - 2 ? (
                    <Button onClick={nextStep} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Próximo
                        <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                ) : currentStep === steps.length - 2 ? (
                     <GradientButton onClick={methods.handleSubmit(showFinalStep)} className="gradient-button-green">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Finalizar e Gerar
                    </GradientButton>
                ) : (
                    <Button 
                        onClick={downloadPdf} 
                        disabled={isDownloading}
                        className="bg-green-600 hover:bg-green-700 text-white"
                    >
                        {isDownloading ? <Loader2 className="w-4 h-4 mr-2 animate-spin"/> : <FileDown className="w-4 h-4 mr-2" />}
                        {isDownloading ? 'Baixando PDF...' : 'Baixar Contrato em PDF'}
                    </Button>
                )}
            </div>
        </div>
    </main>
  );
}
