'use client';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GradientButton } from '@/components/ui/gradient-button';

const formSchema = z.object({
  yourName: z.string().min(1, 'Campo obrigatório'),
  targetCompanyName: z.string().min(1, 'Campo obrigatório'),
  contactName: z.string().min(1, 'Campo obrigatório'),
  companyWhatsApp: z.string().optional(),
  problem: z.string().min(1, 'Campo obrigatório'),
  solution: z.string().min(1, 'Campo obrigatório'),
  differential: z.string().min(1, 'Campo obrigatório'),
  objective: z.string().min(1, 'Campo obrigatório'),
  tone: z.enum(['Formal', 'Casual', 'Direto e Objetivo']),
});

type FormData = z.infer<typeof formSchema>;

const FormLabel = ({ fieldName, label, isFilled }: { fieldName: keyof FormData, label: string, isFilled: boolean }) => (
    <div className="flex items-center gap-1.5">
        <Label htmlFor={fieldName} className="text-sm text-zinc-400">{label}</Label>
        {isFilled && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1 text-green-400">
                <Check className="w-3 h-3" />
                <span className="text-xs font-light">(Respondido)</span>
            </motion.div>
        )}
    </div>
);


export default function AbordagemPage() {
    const methods = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            yourName: '',
            targetCompanyName: '',
            contactName: '',
            companyWhatsApp: '',
            problem: '',
            solution: '',
            differential: '',
            objective: '',
            tone: 'Formal',
        },
        mode: 'all'
    });

    const { control, watch, formState: { errors, touchedFields } } = methods;

    const onSubmit = (data: FormData) => {
        console.log(data);
        // Aqui você chamaria a IA para gerar a abordagem
    };
    
    const watchedFields = watch();

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
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/60">
                            Gerador de Abordagem
                        </h1>
                        <p className="mt-2 text-zinc-400">Preencha os campos para criar uma mensagem de prospecção personalizada.</p>
                    </div>

                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                            <motion.div 
                                className="p-8 space-y-8 bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm rounded-lg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <FormLabel fieldName="yourName" label="Seu Nome ou Nome da Empresa/Projeto" isFilled={!!watchedFields.yourName && touchedFields.yourName} />
                                        <Input {...methods.register('yourName')} id="yourName" className="bg-zinc-800 border-zinc-700 focus:border-green-500 focus:ring-green-500/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <FormLabel fieldName="targetCompanyName" label="Nome da Empresa Alvo" isFilled={!!watchedFields.targetCompanyName && touchedFields.targetCompanyName} />
                                        <Input {...methods.register('targetCompanyName')} id="targetCompanyName" className="bg-zinc-800 border-zinc-700 focus:border-green-500 focus:ring-green-500/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <FormLabel fieldName="contactName" label="Nome do Contato (se souber)" isFilled={!!watchedFields.contactName && touchedFields.contactName} />
                                        <Input {...methods.register('contactName')} id="contactName" className="bg-zinc-800 border-zinc-700 focus:border-green-500 focus:ring-green-500/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="companyWhatsApp" className="text-sm text-zinc-400">WhatsApp da Empresa (opcional)</Label>
                                        <Input {...methods.register('companyWhatsApp')} id="companyWhatsApp" placeholder="Ex: 5511999999999" className="bg-zinc-800 border-zinc-700 focus:border-green-500 focus:ring-green-500/50" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                     <FormLabel fieldName="problem" label="Principal Problema que seu produto resolve para eles" isFilled={!!watchedFields.problem && touchedFields.problem} />
                                    <Textarea {...methods.register('problem')} id="problem" className="bg-zinc-800 border-zinc-700 min-h-[80px] focus:border-green-500 focus:ring-green-500/50" />
                                </div>
                                <div className="space-y-2">
                                    <FormLabel fieldName="solution" label="Sua Solução (em uma frase)" isFilled={!!watchedFields.solution && touchedFields.solution} />
                                    <Textarea {...methods.register('solution')} id="solution" className={cn("bg-zinc-800 border-zinc-700 min-h-[80px] focus:border-green-500 focus:ring-green-500/50", {'border-green-500 ring-2 ring-green-500/50': !!watchedFields.solution})} />
                                </div>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                         <FormLabel fieldName="differential" label="Seu Principal Diferencial" isFilled={!!watchedFields.differential && touchedFields.differential} />
                                        <Input {...methods.register('differential')} id="differential" placeholder="Ex: mais intuitivo que os concorrentes" className="bg-zinc-800 border-zinc-700 focus:border-green-500 focus:ring-green-500/50" />
                                    </div>
                                     <div className="space-y-2">
                                         <FormLabel fieldName="objective" label="Qual o objetivo da mensagem?" isFilled={!!watchedFields.objective && touchedFields.objective} />
                                        <Input {...methods.register('objective')} id="objective" placeholder="Ex: agendar uma chamada de 15 minutos" className="bg-zinc-800 border-zinc-700 focus:border-green-500 focus:ring-green-500/50" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <FormLabel fieldName="tone" label="Tom da Mensagem" isFilled={!!watchedFields.tone && touchedFields.tone} />
                                    <Controller
                                        name="tone"
                                        control={control}
                                        render={({ field }) => (
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                className="flex space-x-4"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="Formal" id="formal" className="text-green-400 border-zinc-600" />
                                                    <Label htmlFor="formal" className="text-zinc-300">Formal</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="Casual" id="casual" className="text-green-400 border-zinc-600" />
                                                    <Label htmlFor="casual" className="text-zinc-300">Casual</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="Direto e Objetivo" id="direto" className="text-green-400 border-zinc-600" />
                                                    <Label htmlFor="direto" className="text-zinc-300">Direto e Objetivo</Label>
                                                </div>
                                            </RadioGroup>
                                        )}
                                    />
                                </div>
                                <div className="flex justify-end pt-4">
                                     <GradientButton type="submit" className="gradient-button-green">
                                        <Sparkles className="w-4 h-4" />
                                        <span className="ml-2">Gerar Abordagem</span>
                                    </GradientButton>
                                </div>
                            </motion.div>
                        </form>
                    </FormProvider>
                </motion.div>
            </div>
        </main>
    );
}