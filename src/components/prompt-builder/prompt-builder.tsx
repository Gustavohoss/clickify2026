

'use client';

import { useState, useMemo, useTransition } from 'react';
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
  Target,
  Layers,
  Code,
  Sparkles,
  RefreshCw,
  LayoutTemplate,
  Shield,
  Moon,
  User,
  Lightbulb,
  Search,
  Trophy,
  Settings
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { GradientButton } from '@/components/ui/gradient-button';
import { cn } from '@/lib/utils';

const steps = [
  { id: '01', name: 'Informações Básicas', icon: FileText },
  { id: '02', name: 'Design e Estilo', icon: Palette },
  { id: '03', name: 'Público e Funções', icon: Target },
  { id: '04', name: 'Funcionalidades Adicionais', icon: Layers },
  { id: '05', name: 'Detalhes Finais', icon: Settings },
  { id: '06', name: 'Revisão e Geração', icon: Code },
];

type FormData = {
  siteName: string;
  tipo: string;
  customTipo: string;
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
  additionalFeatures: string[];
};

const additionalFeaturesOptions = [
  {
    title: 'Design 100% Responsivo',
    description: 'Garante que a interface se adapte a qualquer tamanho de tela.',
    icon: LayoutTemplate,
    badge: 'Padrão',
    badgeColor: 'bg-blue-500/10 text-blue-300 border-blue-500/30'
  },
  {
    title: 'Estados de Carregamento',
    description: 'Animações visuais enquanto os dados são processados.',
    icon: RefreshCw,
    badge: 'Recomendado',
    badgeColor: 'bg-green-500/10 text-green-300 border-green-500/30'
  },
  {
    title: 'Tratamento de Erros Amigável',
    description: 'Exibe mensagens claras e úteis quando algo dá errado.',
    icon: Shield,
    badge: 'Recomendado',
    badgeColor: 'bg-green-500/10 text-green-300 border-green-500/30'
  },
  {
    title: 'Modo Escuro/Claro',
    description: 'Permite ao usuário alternar entre um tema claro e um escuro.',
    icon: Moon,
    badge: 'Recomendado',
    badgeColor: 'bg-green-500/10 text-green-300 border-green-500/30'
  },
  {
    title: 'Gerenciamento de Perfil',
    description: 'Página para o usuário atualizar suas informações pessoais e senha.',
    icon: User,
    badge: 'Recomendado',
    badgeColor: 'bg-green-500/10 text-green-300 border-green-500/30'
  },
  {
    title: 'Onboarding Interativo',
    description: 'Um tour guiado na primeira visita para apresentar as funcionalidades.',
    icon: Lightbulb,
    badge: 'Opcional',
    badgeColor: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30'
  },
  {
    title: 'Busca Global',
    description: 'Uma barra de busca que permita encontrar informações em todo o app.',
    icon: Search,
    badge: 'Recomendado',
    badgeColor: 'bg-green-500/10 text-green-300 border-green-500/30'
  },
  {
    title: 'Sistema de Gamificação',
    description: 'Adiciona pontos e medalhas para incentivar o uso.',
    icon: Trophy,
    badge: 'Opcional',
    badgeColor: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30'
  }
];


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


export default function PromptBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    siteName: '',
    tipo: 'Site Institucional',
    customTipo: '',
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
    additionalFeatures: ['Design 100% Responsivo'],
  });
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureToggle = (featureTitle: string) => {
    setFormData(prev => {
        const currentFeatures = prev.additionalFeatures;
        const isAlreadyAdded = currentFeatures.includes(featureTitle);
        if (isAlreadyAdded) {
            return { ...prev, additionalFeatures: currentFeatures.filter(f => f !== featureTitle) };
        } else {
            return { ...prev, additionalFeatures: [...currentFeatures, featureTitle] };
        }
    });
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
    startTransition(() => {
        const h = formData;
        const P = h.tipo === 'Outros' ? h.customTipo : h.tipo;
        const Y = h.idioma;
        const Q = h.plataforma;
        const m = h.isInstitutional === 'institucional';
        const V = h.visualStyle;
        const M = h.tipografia;

        const funcionalidadesManuais = h.funcionalidades.split('\n').filter(line => line.trim() !== '').map(line => `- ${line.trim()}`);
        
        const funcionalidadesAdicionais = h.additionalFeatures.map(featureTitle => {
            const feature = additionalFeaturesOptions.find(f => f.title === featureTitle);
            return `- ${feature?.title}: ${feature?.description}`;
        });

        const B = [...funcionalidadesManuais, ...funcionalidadesAdicionais].join('\n');
        
        const finalPrompt = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 PROJETO: ${h.siteName}
📌 TIPO: ${P}
🌐 IDIOMA: ${Y}
🔧 PLATAFORMA DE DESENVOLVIMENTO: ${Q}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 VISÃO GERAL DO PROJETO
Desenvolva ${P.toLowerCase()} completo e profissional chamado "${h.siteName}". Este projeto deve ser construído seguindo as melhores práticas de desenvolvimento moderno, com foco em performance, escalabilidade e experiência do usuário excepcional.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 DESCRIÇÃO DETALHADA
${h.description || "Criar uma aplicação moderna e funcional que atenda às necessidades do usuário final."}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👥 PÚBLICO-ALVO E PERSONAS
${h.targetAudience || "Usuários que buscam uma solução digital intuitiva e eficiente."}

Considere criar personas detalhadas para:
- Usuário principal (perfil demográfico, necessidades, dores)
- Usuário secundário (casos de uso alternativos)
- Administrador do sistema (se aplicável)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ FUNCIONALIDADES PRINCIPAIS
${B || "Sistema responsivo com funcionalidades essenciais"}

Implemente cada funcionalidade com:
- Validação de dados robusta
- Tratamento de erros elegante
- Feedback visual para o usuário
- Estados de loading adequados
- Animações suaves e profissionais

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎨 DESIGN SYSTEM E IDENTIDADE VISUAL

TIPO DE PROJETO: ${m ? "Site Institucional/Landing Page" : "Aplicativo SaaS/Sistema"}

ESTILO VISUAL: ${V || "Moderno e Profissional"}

PALETA DE CORES:
├─ Cor Primária: ${h.primaryColor} (botões, CTAs, destaques)
├─ Cor Secundária: ${h.secondaryColor} (elementos de apoio)
├─ Cor de Fundo: ${h.backgroundColor} (background principal)
└─ Cor do Texto: ${h.textColor} (tipografia principal)

TIPOGRAFIA: ${M || "Fonte moderna e legível"}

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
${h.specialRequirements || "Nenhum requisito especial adicional."}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 INSPIRAÇÃO E REFERÊNCIAS
${h.inspiration || "Busque inspiração em designs modernos e tendências atuais de UI/UX."}

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
Entregue ${P.toLowerCase()} completo, profissional e pronto para produção. O projeto deve impressionar visualmente, funcionar perfeitamente em todos os dispositivos e proporcionar uma experiência de usuário excepcional.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 Gerado pela CLICKIFY IA - Sua plataforma de criação de SaaS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

        setGeneratedPrompt(finalPrompt.trim());
        setCurrentStep(steps.length - 1);
    });
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
                    <SelectItem value="Outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
               {formData.tipo === 'Outros' && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                >
                    <Label htmlFor="customTipo" className="text-white/80">Especifique o tipo</Label>
                    <Input 
                        id="customTipo" 
                        name="customTipo" 
                        value={formData.customTipo} 
                        onChange={handleChange} 
                        placeholder="Ex: Plataforma de Cursos" 
                        className="bg-white/5 border-white/10 text-white" 
                    />
                </motion.div>
              )}
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
            <h3 className="text-lg font-bold text-white">Funcionalidades Adicionais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {additionalFeaturesOptions.map(feature => {
                const isSelected = formData.additionalFeatures.includes(feature.title);
                return (
                  <motion.div
                    key={feature.title}
                    onClick={() => handleFeatureToggle(feature.title)}
                    className={cn(
                        "relative p-4 rounded-lg cursor-pointer border transition-all duration-300",
                        isSelected ? 'bg-purple-500/10 border-purple-500/50 shadow-inner shadow-purple-900/50' : 'bg-white/5 border-white/10 hover:bg-white/10'
                    )}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className={cn("w-8 h-8 rounded-md flex items-center justify-center", isSelected ? 'bg-purple-500/20' : 'bg-zinc-700/50')}>
                                <feature.icon className={cn("w-5 h-5", isSelected ? 'text-purple-300' : 'text-zinc-300')} />
                            </div>
                            <h4 className={cn("font-semibold", isSelected ? 'text-white' : 'text-zinc-200')}>{feature.title}</h4>
                        </div>
                        <div className={cn("w-5 h-5 rounded-full flex items-center justify-center border", isSelected ? 'bg-purple-500 border-purple-400' : 'border-zinc-600')}>
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                    </div>
                    <p className="text-xs text-zinc-400 mt-2 pl-11">{feature.description}</p>
                    {feature.badge && (
                      <div className={cn(
                          "absolute bottom-2 left-2 text-xs font-medium px-2 py-0.5 rounded-full border",
                          feature.badgeColor
                      )}>
                          {feature.badge}
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="inspiration" className="text-white/80">Inspirações e Referências</Label>
                <Textarea id="inspiration" name="inspiration" value={formData.inspiration} onChange={handleChange} placeholder="Liste sites ou apps que você gosta e explique o porquê. Ex: 'Gosto do visual do site da Stripe', 'A simplicidade do app do Nubank', etc." className="bg-white/5 border-white/10 text-white min-h-[120px]" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="specialRequirements" className="text-white/80">Requisitos Especiais</Label>
                <Textarea id="specialRequirements" name="specialRequirements" value={formData.specialRequirements} onChange={handleChange} placeholder="Algo mais que a IA deva saber? Ex: 'O projeto deve ser otimizado para SEO', 'Precisa de uma integração com a API X', etc." className="bg-white/5 border-white/10 text-white min-h-[120px]" />
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
              <a href="https://lovable.dev/invite/9JZ3191" target="_blank" rel="noopener noreferrer">
                <GradientButton variant="variant">
                  <Sparkles className="w-4 h-4" />
                  <span className="ml-2">Gerar meu SaaS na Lovable</span>
                </GradientButton>
              </a>
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
                      {currentStep > index ? <Check className="w-5 h-5" /> : (
                         <div className="h-10 w-10 rounded-full flex items-center justify-center">
                            <step.icon className="w-5 h-5" />
                         </div>
                      )}
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
                <GradientButton onClick={generatePrompt} className="gradient-button-green" disabled={isPending}>
                    {isPending ? <RefreshCw className="w-4 h-4 animate-spin"/> : <Code className="w-4 h-4" />}
                    <span className="ml-2">{isPending ? 'Gerando...' : 'Gerar Prompt'}</span>
                </GradientButton>
              )}
          </div>
      )}
    </>
  )
}
