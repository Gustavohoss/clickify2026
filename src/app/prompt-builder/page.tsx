
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
  Sparkles,
  Send,
  ArrowLeft,
  PencilRuler,
  Package,
  ArrowRight,
  Pizza,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Link from 'next/link';
import { GradientButton } from '@/components/ui/gradient-button';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Safari_01 from '@/components/ui/safari-01';

const steps = [
  { id: '01', name: 'Informações Básicas', icon: FileText },
  { id: '02', name: 'Design e Estilo', icon: Palette },
  { id: '03', name: 'Público e Funções', icon: Target },
  { id: '04', name: 'Detalhes Adicionais', icon: Settings },
  { id: '05', name: 'Revisão e Geração', icon: Code },
];

type FormData = {
  siteName: string;
  tipo: string;
  idioma: string;
  plataforma: string;
  isInstitutional: string;
  description: string;
  targetAudience: string;
  funcionalidades: string;
  visualStyle: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  tipografia: string;
  specialRequirements: string;
  inspiration: string;
};

const colorPalettes = [
  { 
    name: 'Stripe (Moderno)', 
    colors: { primary: '#635BFF', secondary: '#F6F8FA', background: '#FFFFFF', text: '#0A2540' }
  },
  { 
    name: 'Vercel (Clean)', 
    colors: { primary: '#0070F3', secondary: '#EAEAEA', background: '#FFFFFF', text: '#000000' }
  },
  {
    name: 'Amazon',
    colors: { primary: '#FF9900', secondary: '#232F3E', background: '#FFFFFF', text: '#0F1111' }
  },
  {
    name: 'Mercado Livre',
    colors: { primary: '#FFE600', secondary: '#3483FA', background: '#EBEBEB', text: '#333333' }
  },
  {
    name: 'Shopee',
    colors: { primary: '#EE4D2D', secondary: '#F5F5F5', background: '#FFFFFF', text: '#000000' }
  },
  {
    name: 'AliExpress',
    colors: { primary: '#AE0000', secondary: '#FF4747', background: '#FFFFFF', text: '#000000' }
  },
  {
    name: 'Nike (Minimalista)',
    colors: { primary: '#111111', secondary: '#F5F5F5', background: '#FFFFFF', text: '#111111' }
  },
  {
    name: 'Magalu (Varejo)',
    colors: { primary: '#0086FF', secondary: '#F2F3F4', background: '#FFFFFF', text: '#333333' }
  },
  {
    name: 'Kabum (Gamer)',
    colors: { primary: '#FF6600', secondary: '#003366', background: '#0A1E2E', text: '#FFFFFF' }
  },
  {
    name: 'Americanas',
    colors: { primary: '#E60014', secondary: '#F2F2F2', background: '#FFFFFF', text: '#333333' }
  },
  {
    name: 'Best Buy (Eletrônicos)',
    colors: { primary: '#0046BE', secondary: '#FFDE00', background: '#FFFFFF', text: '#000000' }
  },
  {
    name: 'Sephora (Luxo)',
    colors: { primary: '#000000', secondary: '#F5F5F5', background: '#FFFFFF', text: '#000000' }
  },
  {
    name: 'Tiffany & Co.',
    colors: { primary: '#0ABAB5', secondary: '#F5F5F5', background: '#FFFFFF', text: '#333333' }
  },
  {
    name: 'Apple (Clean)',
    colors: { primary: '#007AFF', secondary: '#F5F5F7', background: '#FFFFFF', text: '#1D1D1F' }
  },
  { 
    name: 'Linear (Elegante)', 
    colors: { primary: '#5E6AD2', secondary: '#1A1C23', background: '#0B0C10', text: '#FFFFFF' }
  },
  { 
    name: 'Padrão (Violeta)', 
    colors: { primary: '#6D28D9', secondary: '#1F2937', background: '#0A0A0A', text: '#F9FAFB' }
  },
  { 
    name: 'Floresta Sombria', 
    colors: { primary: '#22C55E', secondary: '#1A2E26', background: '#0C1410', text: '#E2F9E9' }
  },
  { 
    name: 'Oceano Profundo', 
    colors: { primary: '#3B82F6', secondary: '#1E293B', background: '#0F172A', text: '#D1E3FF' }
  },
  { 
    name: 'Pôr do Sol', 
    colors: { primary: '#F97316', secondary: '#4A2111', background: '#1C0D05', text: '#FFEAD9' }
  },
  {
    name: 'Neon Noturno',
    colors: { primary: '#EC4899', secondary: '#391A2C', background: '#120A0F', text: '#FCE7F3' }
  }
];

const fontOptions = [
    'Inter, sans-serif',
    'Montserrat, sans-serif',
    'Lato, sans-serif',
    'Open Sans, sans-serif',
    'Roboto, sans-serif',
    'Poppins, sans-serif',
    'Oswald, sans-serif',
    'Raleway, sans-serif',
    'Nunito, sans-serif',
    'Playfair Display, serif',
  ];

function PromptBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    siteName: '',
    tipo: 'Site Institucional',
    idioma: 'Português (Brasil)',
    plataforma: 'Web (Desktop e Mobile)',
    isInstitutional: 'institucional',
    description: '',
    targetAudience: '',
    funcionalidades: '',
    visualStyle: 'Moderno e Profissional',
    primaryColor: colorPalettes[0].colors.primary,
    secondaryColor: colorPalettes[0].colors.secondary,
    backgroundColor: colorPalettes[0].colors.background,
    textColor: colorPalettes[0].colors.text,
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

  const handlePaletteChange = (paletteName: string) => {
    const selectedPalette = colorPalettes.find(p => p.name === paletteName);
    if (selectedPalette) {
      setFormData(prev => ({
        ...prev,
        primaryColor: selectedPalette.colors.primary,
        secondaryColor: selectedPalette.colors.secondary,
        backgroundColor: selectedPalette.colors.background,
        textColor: selectedPalette.colors.text,
      }));
    }
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
    const m = p.isInstitutional === 'institucional';
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
                <Label className="text-white/80">Plataforma de Desenvolvimento</Label>
                <Select name="plataforma" value={formData.plataforma} onValueChange={(value) => handleSelectChange('plataforma', value)}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-zinc-900 text-white border-zinc-800">
                    <SelectItem value="Web (Desktop e Mobile)">Web (Desktop e Mobile)</SelectItem>
                    <SelectItem value="Apenas Mobile">Apenas Mobile</SelectItem>
                    <SelectItem value="Apenas Desktop">Apenas Desktop</SelectItem>
                  </SelectContent>
                </Select>
            </div>
            <div className="space-y-3">
              <Label className="text-white/80">Qual o foco principal do projeto?</Label>
              <RadioGroup
                name="isInstitutional"
                value={formData.isInstitutional}
                onValueChange={(value) => handleSelectChange('isInstitutional', value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="institucional" id="institucional" className="text-purple-400 border-zinc-600" />
                  <Label htmlFor="institucional" className="text-white/80">Institucional/Divulgação</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="aplicacao" id="aplicacao" className="text-purple-400 border-zinc-600" />
                  <Label htmlFor="aplicacao" className="text-white/80">Aplicação/Sistema</Label>
                </div>
              </RadioGroup>
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

            <div className="space-y-2">
                <Label className="text-white/80">Paletas de Cores Pré-definidas</Label>
                <Select onValueChange={handlePaletteChange}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue placeholder="Selecione uma paleta" /></SelectTrigger>
                  <SelectContent className="bg-zinc-900 text-white border-zinc-800">
                    {colorPalettes.map((palette) => (
                      <SelectItem key={palette.name} value={palette.name}>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: palette.colors.primary }} />
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: palette.colors.secondary }} />
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: palette.colors.background }} />
                           <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: palette.colors.text }} />
                          <span>{palette.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

            <div className="space-y-4">
              <Label className="text-white/80">Personalizar Paleta</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor" className="text-sm text-white/60">Primária</Label>
                  <div className="relative">
                    <Input id="primaryColor" name="primaryColor" type="color" value={formData.primaryColor} onChange={handleChange} className="w-full h-10 p-0 border-none cursor-pointer bg-transparent" />
                     <div className="absolute inset-0 rounded-md pointer-events-none border border-white/20" style={{backgroundColor: formData.primaryColor}}></div>
                  </div>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="secondaryColor" className="text-sm text-white/60">Secundária</Label>
                   <div className="relative">
                    <Input id="secondaryColor" name="secondaryColor" type="color" value={formData.secondaryColor} onChange={handleChange} className="w-full h-10 p-0 border-none cursor-pointer bg-transparent" />
                    <div className="absolute inset-0 rounded-md pointer-events-none border border-white/20" style={{backgroundColor: formData.secondaryColor}}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backgroundColor" className="text-sm text-white/60">Fundo</Label>
                   <div className="relative">
                    <Input id="backgroundColor" name="backgroundColor" type="color" value={formData.backgroundColor} onChange={handleChange} className="w-full h-10 p-0 border-none cursor-pointer bg-transparent" />
                    <div className="absolute inset-0 rounded-md pointer-events-none border border-white/20" style={{backgroundColor: formData.backgroundColor}}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="textColor" className="text-sm text-white/60">Texto</Label>
                  <div className="relative">
                    <Input id="textColor" name="textColor" type="color" value={formData.textColor} onChange={handleChange} className="w-full h-10 p-0 border-none cursor-pointer bg-transparent" />
                    <div className="absolute inset-0 rounded-md pointer-events-none border border-white/20" style={{backgroundColor: formData.textColor}}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white/80">Tipografia</Label>
                <Select name="tipografia" value={formData.tipografia} onValueChange={(value) => handleSelectChange('tipografia', value)}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-zinc-900 text-white border-zinc-800">
                    {fontOptions.map(font => (
                        <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                        {font.split(',')[0]}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
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
            <div className="flex justify-between items-start">
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
            <pre className="w-full bg-white/5 p-4 rounded-lg text-white/90 text-xs overflow-x-auto whitespace-pre-wrap font-mono h-[440px]">
                {generatedPrompt}
            </pre>
            <div className="flex justify-center pt-4">
              <Link href="https://lovable.dev/invite/9JZ3191" passHref>
                <GradientButton variant="variant">
                  <Sparkles className="w-4 h-4" />
                  <span className="ml-2">Criar site!</span>
                </GradientButton>
              </Link>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <>
      <div className="text-center mb-12 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/60">
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
                      className={cn(`h-10 w-10 rounded-full flex items-center justify-center transition-colors`,
                          currentStep > index && 'text-white gradient-step-icon-completed',
                          currentStep === index && 'text-white gradient-step-icon shadow-[0_0_15px_rgba(192,132,252,0.5)]',
                          currentStep < index && 'bg-zinc-800 text-zinc-400 border border-zinc-700'
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
                <GradientButton onClick={generatePrompt} className="gradient-button-green">
                    <Code className="w-4 h-4" />
                    <span className="ml-2">Gerar Prompt</span>
                </GradientButton>
              )}
          </div>
      )}
    </>
  )
}

const pizzaZapPrompt = `🎯 Mission Statement

Quero construir um site de pizzaria que ajude clientes a ver o cardápio e fazer pedidos rapidamente pelo WhatsApp. Ele deve parecer quente, apetitoso e direto, despertando fome imediata e reduzindo qualquer atrito até o pedido.

🏷️ Project Name

PizzaZap

👥 Target Audience

Pessoas pedindo pizza pelo celular (principal público)

Famílias e grupos decidindo o pedido rapidamente

Clientes recorrentes que já usam WhatsApp para pedir

🧩 Core Features & Pages

✅ Homepage

Hero com imagem grande de pizza derretendo

Headline curta e direta:

“Pizza quente, pedido na hora.”

CTA principal destacado: “Ver cardápio”

Layout vertical, pensado para scroll rápido no celular

✅ Página de Cardápio

Lista clara e visual de produtos:

Nome da pizza

Ingredientes (curto e legível)

Tamanhos e preços

Cada item com botão forte: “Pedir no WhatsApp”

Cards grandes, fáceis de tocar (mobile)

✅ Integração com WhatsApp

Ao clicar no botão, abrir WhatsApp com mensagem automática:

“Olá! Quero pedir a Pizza Calabresa – Média.”

Número único da pizzaria

Zero cadastro, zero fricção

✅ Seções opcionais

Combos promocionais

Horário de funcionamento

Taxa de entrega / retirada no balcão

🧠 Tech Stack

Frontend: Vite + TypeScript + React + shadcn/ui + Tailwind CSS

Backend & Storage: Lovable Cloud (cardápio, imagens, textos)

Auth: Não necessário (experiência direta)

🎨 Design Guidelines (baseado em design-tips.md) → Emotional Thesis

“Parece entrar numa pizzaria quente e movimentada — cores fortes, cheiro imaginário de pizza e decisão rápida.”

→ Typography

Headings: Sans-serif forte e arredondada (impacto e fome)

Body: Sans-serif simples e legível

Nomes das pizzas com destaque visual

Line-height ≥ 1.5×

→ Color System

Primary: Vermelho tomate #C62828 (estimula apetite)

Accent: Amarelo queijo #FFC107

Background: Creme claro #FFF8F0

Text: Marrom escuro ou preto quente

Botões sempre com alto contraste

→ Layout & Spacing

Grid 8pt

Cards grandes e espaçados

Pouco texto por tela

Hierarquia visual óbvia: imagem → nome → preço → botão

→ Motion & Interactions

(motion como gentileza, não distração)

Hover e tap com leve “press” no botão

Fade-in rápido dos cards

Feedback imediato ao clicar em “Pedir no WhatsApp”

Duração média: 200ms

→ Voice & Microcopy

“Escolha sua pizza favorita 🍕”

“Quentinha, do forno pra você”

“Pedir agora pelo WhatsApp”

Tom: direto, simples e convidativo.

→ System Consistency

Botões sempre no mesmo padrão

Cards reutilizados em todo o site

Cores quentes dominam, sem poluição visual

→ Accessibility

Botões grandes (touch-friendly)

Texto legível em ambientes claros/escuros

Estrutura semântica correta

🤖 Optional AI Feature (futuro)

Sugestão automática de sabores mais pedidos

Personalidade: atendente animado e eficiente

Exemplo:

“A Calabresa é a mais pedida hoje 👀”

🍕 Final Reflection

Este site é feito para abrir fome, reduzir decisão e levar direto ao WhatsApp. Cada escolha — cores, tipografia, layout e interação — trabalha para um único objetivo: pedido feito sem pensar duas vezes.

Gerenciamento: Começar com dados fixos
Seções extras: Incluir combos e informações
Conteúdo: Criar exemplos realistas
WhatsApp: Vou informar depois

Implementar o plano do PizzaZap com homepage completa (hero + combos + informações), cardápio com pizzas de exemplo e integração WhatsApp
`;

function ReadyMadeSaaS() {
    const [promptCopied, setPromptCopied] = useState(false);

    const handleCopyPrompt = () => {
        navigator.clipboard.writeText(pizzaZapPrompt);
        setPromptCopied(true);
        setTimeout(() => setPromptCopied(false), 2000);
    };

  return (
    <div className="space-y-8">
        <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/60 pb-2">
                Modelos Prontos
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
                Escolha um modelo de SaaS pré-construído e acelere o lançamento do seu projeto.
            </p>
        </div>

        <div className="backdrop-blur-xl bg-white/[0.02] rounded-2xl border border-zinc-800 shadow-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-center">
                            <Pizza className="w-6 h-6 text-red-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">PizzaZap</h3>
                            <p className="text-sm text-zinc-400">Site de delivery para pizzarias com pedido via WhatsApp.</p>
                        </div>
                    </div>
                    <div className="text-sm text-zinc-300 space-y-1">
                        <p><span className="font-semibold text-zinc-400">Tecnologias:</span> React, TypeScript, TailwindCSS</p>
                        <p><span className="font-semibold text-zinc-400">Foco:</span> Mobile-first, conversão rápida.</p>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className="border-zinc-800">
                            <AccordionTrigger className="text-sm text-purple-400 hover:text-purple-300 hover:no-underline">Mostrar Prompt Usado</AccordionTrigger>
                            <AccordionContent>
                                <div className="relative">
                                    <pre className="w-full bg-zinc-900/50 p-4 rounded-lg text-white/70 text-xs overflow-x-auto whitespace-pre-wrap font-mono h-64">
                                        {pizzaZapPrompt}
                                    </pre>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={handleCopyPrompt}
                                        className="absolute top-2 right-2 text-zinc-400 hover:text-white hover:bg-zinc-700"
                                    >
                                        {promptCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </Button>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    
                    <div className="flex gap-3 pt-2">
                        <Link href="https://pizza-hot-go.lovable.app" passHref target="_blank">
                             <Button className="w-full bg-white/10 hover:bg-white/20 text-white">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Ver ao vivo
                            </Button>
                        </Link>
                        <GradientButton variant="variant" className="w-full">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Usar este modelo
                        </GradientButton>
                    </div>
                </div>
                
                <div>
                     <Safari_01 url="https://pizza-hot-go.lovable.app" />
                </div>

            </div>
        </div>
    </div>
  )
}


export default function PromptBuilderPage() {
    const [selection, setSelection] = useState<'initial' | 'custom' | 'template'>('initial');

    const handleBackToSelection = () => {
      setSelection('initial');
    }

    const renderContent = () => {
        switch (selection) {
            case 'custom':
                return <PromptBuilder />;
            case 'template':
                return <ReadyMadeSaaS />;
            case 'initial':
            default:
                return (
                    <div className="text-center">
                        <div className="text-center mb-12 space-y-2">
                            <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/60">
                                Como você quer começar?
                            </h1>
                            <p className="text-lg text-white/50 max-w-2xl mx-auto">
                                Crie um projeto do zero com nosso assistente ou escolha um modelo pronto para acelerar o desenvolvimento.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                            <motion.div
                                className="group relative backdrop-blur-xl bg-white/[0.02] rounded-2xl border border-zinc-800 shadow-2xl p-8 cursor-pointer overflow-hidden hover:border-purple-500/50 transition-colors duration-300"
                                whileHover={{ y: -5 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                onClick={() => setSelection('custom')}
                            >
                                <div className="relative z-10 text-left">
                                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 group-hover:text-purple-300 transition-colors">
                                    Criar do Zero
                                    </h2>
                                    <p className="text-white/40 mt-2">
                                    Use nosso assistente passo a passo para gerar um briefing detalhado e criar seu SaaS personalizado.
                                    </p>
                                </div>
                                <div className="mt-6 flex items-center text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                                    Começar
                                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                </div>
                                <PencilRuler className="absolute -right-8 -bottom-8 h-32 w-32 text-white/5 group-hover:text-purple-500/10 transition-colors duration-500"/>
                            </motion.div>
                            <motion.div
                                className="group relative backdrop-blur-xl bg-white/[0.02] rounded-2xl border border-zinc-800 shadow-2xl p-8 cursor-pointer overflow-hidden hover:border-teal-500/50 transition-colors duration-300"
                                whileHover={{ y: -5 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                onClick={() => setSelection('template')}
                            >
                                <div className="relative z-10 text-left">
                                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 group-hover:text-teal-300 transition-colors">
                                    Pegar um Pronto
                                    </h2>
                                    <p className="text-white/40 mt-2">
                                    Escolha um modelo de SaaS pré-construído e acelere o lançamento do seu projeto.
                                    </p>
                                </div>
                                <div className="mt-6 flex items-center text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                                    Ver Modelos
                                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                </div>
                                <Package className="absolute -right-8 -bottom-8 h-32 w-32 text-white/5 group-hover:text-teal-500/10 transition-colors duration-500"/>
                            </motion.div>
                        </div>
                    </div>
                );
        }
    }


  return (
    <main className="p-4 md:p-10 min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
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
        
        <div className="pt-24">
            <AnimatePresence mode="wait">
                <motion.div 
                    key={selection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {selection !== 'initial' && (
                        <div className="mb-8">
                            <Button
                                onClick={handleBackToSelection}
                                variant="ghost"
                                className="text-white/70 hover:text-white hover:bg-white/10"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Voltar para a seleção
                            </Button>
                        </div>
                    )}
                    {renderContent()}
                </motion.div>
            </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
