'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Palette,
  Lightbulb,
  Target,
  Settings,
  Code,
} from 'lucide-react';
import { Label } from '@/components/ui/label';

const steps = [
  { id: '01', name: 'Informações Básicas', icon: FileText },
  { id: '02', name: 'Design e Estilo', icon: Palette },
  { id: '03', name: 'Público e Funcionalidades', icon: Target },
  { id: '04', name: 'Detalhes Adicionais', icon: Settings },
  { id: '05', name: 'Revisão e Geração', icon: Code },
];

type FormData = {
  siteName: string;
  tipo: string;
  idioma: string;
  plataforma: string;
  description: string;
  targetAudience: string;
  funcionalidades: string;
  isInstitutional: boolean;
  visualStyle: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  tipografia: string;
  specialRequirements: string;
  inspiration: string;
};

export default function PromptBuilderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    siteName: '',
    tipo: 'Site Institucional',
    idioma: 'Português (Brasil)',
    plataforma: 'Web (Desktop e Mobile)',
    description: '',
    targetAudience: '',
    funcionalidades: '',
    isInstitutional: true,
    visualStyle: 'Moderno e Profissional',
    primaryColor: '#6D28D9',
    secondaryColor: '#1F2937',
    backgroundColor: '#0A0A0A',
    textColor: '#F9FAFB',
    tipografia: 'Inter, sans-serif',
    specialRequirements: '',
    inspiration: '',
  });
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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
  
  const generatePrompt = () => {
    const p = formData;
    const E = p.tipo;
    const D = p.idioma;
    const F = p.plataforma;
    const L = p.funcionalidades;
    const m = p.isInstitutional;
    const $ = p.visualStyle;
    const I = p.tipografia;

    const prompt = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 PROJETO: ${p.siteName}
📌 TIPO: ${E}
🌐 IDIOMA: ${D}
🔧 PLATAFORMA DE DESENVOLVIMENTO: ${F}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 VISÃO GERAL DO PROJETO
Desenvolva ${E.toLowerCase()} completo e profissional chamado "${p.siteName}". Este projeto deve ser construído seguindo as melhores práticas de desenvolvimento moderno, com foco em performance, escalabilidade e experiência do usuário excepcional.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 DESCRIÇÃO DETALHADA
${p.description||"Criar uma aplicação moderna e funcional que atenda às necessidades do usuário final."}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👥 PÚBLICO-ALVO E PERSONAS
${p.targetAudience||"Usuários que buscam uma solução digital intuitiva e eficiente."}

Considere criar personas detalhadas para:
- Usuário principal (perfil demográfico, necessidades, dores)
- Usuário secundário (casos de uso alternativos)
- Administrador do sistema (se aplicável)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ FUNCIONALIDADES PRINCIPAIS
${L||"Sistema responsivo com funcionalidades essenciais"}

Implemente cada funcionalidade com:
- Validação de dados robusta
- Tratamento de erros elegante
- Feedback visual para o usuário
- Estados de loading adequados
- Animações suaves e profissionais

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎨 DESIGN SYSTEM E IDENTIDADE VISUAL

TIPO DE PROJETO: ${m?"Site Institucional/Landing Page":"Aplicativo SaaS/Sistema"}

ESTILO VISUAL: ${$||"Moderno e Profissional"}

PALETA DE CORES:
├─ 🟢 Cor Primária: ${p.primaryColor} (botões, CTAs, destaques)
├─ ⚫ Cor Secundária: ${p.secondaryColor} (elementos de apoio)
├─ 🖤 Cor de Fundo: ${p.backgroundColor} (background principal)
└─ ⚪ Cor do Texto: ${p.textColor} (tipografia principal)

TIPOGRAFIA: ${I||"Fonte moderna e legível"}

DIRETRIZES DE DESIGN:
- Utilize um Design System consistente com componentes reutilizáveis
- Aplique hierarquia visual clara com espaçamento adequado
- Implemente micro-interações e transições suaves
- Garanta contraste adequado para acessibilidade (WCAG 2.1)
- Use ícones consistentes (Lucide React ou similar)
- Aplique sombras e gradientes sutis para profundidade

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📱 RESPONSIVIDADE
- Mobile First: otimize para dispositivos móveis primeiro
- Breakpoints: 320px, 768px, 1024px, 1280px, 1536px
- Touch-friendly: áreas de toque mínimas de 44x44px
- Navegação adaptativa para diferentes tamanhos de tela

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔧 REQUISITOS TÉCNICOS
- React + TypeScript para tipagem segura
- Tailwind CSS para estilização
- Componentes funcionais com hooks modernos
- Gerenciamento de estado eficiente
- Código limpo, modular e bem documentado
- SEO otimizado com meta tags apropriadas

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⭐ REQUISITOS ESPECIAIS E PERSONALIZAÇÕES
${p.specialRequirements||"Nenhum requisito especial adicional."}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 INSPIRAÇÃO E REFERÊNCIAS
${p.inspiration||"Busque inspiração em designs modernos e tendências atuais de UI/UX."}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ CHECKLIST DE QUALIDADE
□ Interface intuitiva e fácil de usar
□ Performance otimizada (Lighthouse score > 90)
□ Código limpo e manutenível
□ Testes de usabilidade considerados
□ Acessibilidade implementada
□ Loading states e empty states definidos
□ Mensagens de erro claras e amigáveis
□ Animações suaves sem impactar performance

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 RESULTADO ESPERADO
Entregue ${E.toLowerCase()} completo, profissional e pronto para produção. O projeto deve impressionar visualmente, funcionar perfeitamente em todos os dispositivos e proporcionar uma experiência de usuário excepcional.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 Gerado pela CLICKIFY - Sua plataforma de criação de SaaS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
    setGeneratedPrompt(prompt.trim());
    setCurrentStep(steps.length - 1);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
             <div className="space-y-2">
              <Label htmlFor="siteName" className="text-white/80">Nome do Projeto/Site</Label>
              <Input id="siteName" name="siteName" value={formData.siteName} onChange={handleChange} placeholder="Ex: Clickify, Barbearia do Zé" className="bg-white/5 border-white/10 text-white" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-white/80">Tipo de Projeto</Label>
                <Select name="tipo" value={formData.tipo} onValueChange={(value) => handleSelectChange('tipo', value)}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-zinc-900 text-white border-zinc-800">
                    <SelectItem value="Site Institucional">Site Institucional</SelectItem>
                    <SelectItem value="Landing Page">Landing Page</SelectItem>
                    <SelectItem value="Blog">Blog</SelectItem>
                    <SelectItem value="E-commerce">E-commerce</SelectItem>
                    <SelectItem value="Aplicativo SaaS">Aplicativo SaaS</SelectItem>
                    <SelectItem value="Sistema Interno">Sistema Interno</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white/80">Idioma Principal</Label>
                <Select name="idioma" value={formData.idioma} onValueChange={(value) => handleSelectChange('idioma', value)}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-zinc-900 text-white border-zinc-800">
                    <SelectItem value="Português (Brasil)">Português (Brasil)</SelectItem>
                    <SelectItem value="Inglês (EUA)">Inglês (EUA)</SelectItem>
                    <SelectItem value="Espanhol">Espanhol</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white/80">Descrição Geral do Projeto</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Descreva em poucas palavras o que o projeto faz e qual problema ele resolve." className="bg-white/5 border-white/10 text-white min-h-[120px]" />
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-white/80">Estilo Visual</Label>
              <Select name="visualStyle" value={formData.visualStyle} onValueChange={(value) => handleSelectChange('visualStyle', value)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-zinc-900 text-white border-zinc-800">
                  <SelectItem value="Moderno e Profissional">Moderno e Profissional</SelectItem>
                  <SelectItem value="Minimalista e Limpo">Minimalista e Limpo</SelectItem>
                  <SelectItem value="Divertido e Colorido">Divertido e Colorido</SelectItem>
                  <SelectItem value="Elegante e Sofisticado">Elegante e Sofisticado</SelectItem>
                  <SelectItem value="Robusto e Industrial">Robusto e Industrial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              <Label className="text-white/80">Paleta de Cores</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor" className="text-sm text-white/60">Primária</Label>
                  <div className="relative">
                    <Input id="primaryColor" name="primaryColor" type="color" value={formData.primaryColor} onChange={handleChange} className="w-full h-10 p-0 border-none cursor-pointer" />
                  </div>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="secondaryColor" className="text-sm text-white/60">Secundária</Label>
                  <Input id="secondaryColor" name="secondaryColor" type="color" value={formData.secondaryColor} onChange={handleChange} className="w-full h-10 p-0 border-none cursor-pointer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backgroundColor" className="text-sm text-white/60">Fundo</Label>
                  <Input id="backgroundColor" name="backgroundColor" type="color" value={formData.backgroundColor} onChange={handleChange} className="w-full h-10 p-0 border-none cursor-pointer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="textColor" className="text-sm text-white/60">Texto</Label>
                  <Input id="textColor" name="textColor" type="color" value={formData.textColor} onChange={handleChange} className="w-full h-10 p-0 border-none cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipografia" className="text-white/80">Tipografia</Label>
              <Input id="tipografia" name="tipografia" value={formData.tipografia} onChange={handleChange} placeholder="Ex: Inter, Montserrat" className="bg-white/5 border-white/10 text-white" />
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="targetAudience" className="text-white/80">Público-Alvo</Label>
              <Textarea id="targetAudience" name="targetAudience" value={formData.targetAudience} onChange={handleChange} placeholder="Descreva para quem é este projeto. Ex: Pequenas empresas, estudantes, entusiastas de tecnologia, etc." className="bg-white/5 border-white/10 text-white min-h-[120px]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="funcionalidades" className="text-white/80">Funcionalidades Principais</Label>
              <Textarea id="funcionalidades" name="funcionalidades" value={formData.funcionalidades} onChange={handleChange} placeholder="Liste as funcionalidades essenciais. Ex: Login de usuário, Dashboard com gráficos, Upload de arquivos, etc. (uma por linha)" className="bg-white/5 border-white/10 text-white min-h-[150px]" />
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="specialRequirements" className="text-white/80">Requisitos Especiais ou Personalizações</Label>
              <Textarea id="specialRequirements" name="specialRequirements" value={formData.specialRequirements} onChange={handleChange} placeholder="Algo específico que precisa ser considerado? Ex: Integração com API externa, modo escuro, suporte a múltiplos idiomas, etc." className="bg-white/5 border-white/10 text-white min-h-[150px]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inspiration" className="text-white/80">Inspirações e Referências</Label>
              <Textarea id="inspiration" name="inspiration" value={formData.inspiration} onChange={handleChange} placeholder="Cite sites ou apps que você gosta e por quê. Ex: 'Gosto do design do Stripe pela simplicidade', 'Adoro as animações do site da Apple'." className="bg-white/5 border-white/10 text-white min-h-[150px]" />
            </div>
          </motion.div>
        );
      default:
        return (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Seu Prompt Gerado</h3>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={prevStep}
                        variant="ghost"
                        size="sm"
                        className="text-white/70 hover:text-white hover:bg-white/10"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Voltar
                    </Button>
                    <Button onClick={copyToClipboard} variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 hover:bg-white/10">
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Clipboard className="w-4 h-4 mr-2" />}
                    {copied ? 'Copiado!' : 'Copiar'}
                    </Button>
                </div>
            </div>
            <pre className="w-full bg-white/5 p-4 rounded-lg text-white/90 text-xs overflow-x-auto whitespace-pre-wrap font-mono h-[500px]">
                {generatedPrompt}
            </pre>
          </motion.div>
        );
    }
  };

  return (
    <main className="p-4 md:p-10 min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 space-y-2">
            <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/60 pb-2">
                Construtor de Prompts
            </h1>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
                Siga as etapas para criar um briefing de projeto detalhado.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-12">
            <nav className="hidden md:block">
                <ol className="space-y-4">
                {steps.map((step, index) => (
                    <li key={step.name} className="relative">
                    <div className="flex items-center space-x-3">
                        <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors
                            ${currentStep > index ? 'bg-purple-600 text-white' : ''}
                            ${currentStep === index ? 'bg-purple-500 text-white border-2 border-purple-300 shadow-[0_0_15px_rgba(192,132,252,0.5)]' : ''}
                            ${currentStep < index ? 'bg-zinc-800 text-zinc-400 border border-zinc-700' : ''}
                        `}
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

            <div className="backdrop-blur-xl bg-white/[0.02] rounded-2xl border border-white/[0.05] shadow-2xl p-8 min-h-[500px]">
                <AnimatePresence mode="wait">
                    <motion.div key={currentStep}>
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>

        {currentStep < steps.length - 1 && (
            <div className="mt-8 flex justify-between">
                <Button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    variant="ghost"
                    className="text-white/70 hover:text-white hover:bg-white/10"
                >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Voltar
                </Button>

                {currentStep < steps.length - 2 ? (
                    <Button onClick={nextStep} className="bg-purple-600 hover:bg-purple-700 text-white">
                        Próximo
                        <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                ) : (
                    <Button onClick={generatePrompt} className="bg-green-600 hover:bg-green-700 text-white">
                        Gerar Prompt
                        <Code className="w-4 h-4 ml-2" />
                    </Button>
                )}
            </div>
        )}
      </div>
    </main>
  );
}
