
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Check,
  Pizza,
  Copy,
  ExternalLink,
  Scissors,
} from 'lucide-react';
import Link from 'next/link';
import { GradientButton } from '@/components/ui/gradient-button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Safari_01 from '@/components/ui/safari-01';

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

const barbeariaKingPrompt = `💡 Lovable App Prompt: Barbearia King 🎯 Mission Statement

Quero construir um site completo de barbearia premium onde o foco principal seja mostrar a qualidade do trabalho e a experiência dos barbeiros, criando confiança antes do agendamento. O site deve permitir agendamento online simples, escolhendo barbeiro, dia e horário, de segunda a sábado, mas sem parecer um sistema frio — e sim uma marca forte.

A sensação principal deve ser: “Essa barbearia é séria, estilosa e sabe exatamente o que está fazendo.”

🏷️ Project Name

Barbearia King

👥 Target Audience

Homens de 16–45 anos que valorizam aparência e estilo

Clientes que querem confiar o visual a profissionais experientes

Pessoas que usam o celular como principal meio de agendamento

Clientes recorrentes que não querem perder tempo com mensagens

🧩 Core Features & Pages 🏠 Homepage (Página Principal — Muito Importante) ✅ Hero Section (Impacto Inicial)

Tela cheia (full screen)

Imagem ou vídeo curto:

Barbeiro trabalhando

Detalhes de acabamento, máquina, navalha

Overlay escuro e elegante

Headline forte:

“Estilo se constrói no detalhe.”

Subheadline curta:

“Barbeiros experientes. Cortes precisos.”

CTA principal destacado: “Agendar horário”

👉 Aqui o objetivo é atmosfera e marca, não explicação.

✅ Seção “Nosso Trabalho” — Portfólio em Grid Fixo

(Escolha confirmada: GRID FIXO)

Grid organizado de fotos reais dos cortes

3 ou 4 colunas no desktop

1 coluna no mobile (scroll natural)

Fotos grandes, bem enquadradas, estilo editorial

Nenhum botão de ação direta

Interação:

Hover sutil:

Leve zoom

Escurecimento discreto

Legenda curta opcional:

“Acabamento preciso • Degradê clássico”

👉 Função da seção: mostrar consistência, qualidade e padrão profissional O cliente não escolhe — ele confia.

✅ Seção “Nossos Barbeiros”

Humaniza e reforça autoridade.

Cards de barbeiro:

Foto profissional do barbeiro

Nome em destaque

Especialidade

Descrição curta (1–2 linhas), exemplo:

“Especialista em degradê e barba. Mais de 6 anos de experiência.”

Interação:

Hover com leve destaque

Visual premium, sem exageros

👉 CTA por barbeiro: “Agendar com este barbeiro”

✅ Seção “Nossa Experiência”

Curta, direta e emocional.

Ícones minimalistas + texto curto:

✂️ “Precisão em cada detalhe”

🕒 “Horário marcado, sem espera”

💈 “Ambiente urbano e profissional”

✅ CTA Final (Conversão)

Fundo escuro sólido

Headline:

“Confiança se constrói com o tempo. Estilo também.”

Botão grande: “Agendar horário agora”

📅 Página de Agendamento Fluxo em Etapas Claras:

Escolher barbeiro

Escolher dia (segunda a sábado)

Escolher horário disponível

Horários ocupados bloqueados

Feedback visual imediato

CTA final: “Confirmar agendamento”

✅ Confirmação

Resumo:

Barbeiro

Data

Horário

Mensagem:

“Horário confirmado. Te esperamos.”

Opções:

Cancelar

Reagendar

🧠 Tech Stack

Frontend: Vite + TypeScript + React + shadcn/ui + Tailwind CSS

Backend & Storage: Lovable Cloud

Barbeiros

Agenda

Horários

Fotos do portfólio

Auth:

Cliente: simples (nome + telefone)

Admin: painel interno da barbearia

🎨 Design Guidelines (baseado em design-tips.md) → Emotional Thesis

“Parece um estúdio masculino urbano — escuro, preciso, silencioso e confiante.”

→ Typography

Headings: Sans-serif condensada, forte

Body: Sans-serif limpa

Pouco texto, frases diretas

Hierarquia clara (H1–H4)

→ Color System

Preto carvão #0F0F0F

Cinza grafite #1C1C1C

Accent dourado queimado ou verde escuro

Texto branco suave #F2F2F2

Contraste WCAG AA+

→ Layout & Spacing

Grid 8pt

Muito respiro visual

Layout organizado

Mobile-first

→ Motion & Interactions

Fade-in suave ao scroll

Hover elegante nas imagens

Transições de 200–300ms

Nada chamativo — tudo profissional

→ Accessibility

Navegação por teclado

Estados de foco visíveis

Botões grandes e claros

Estrutura semântica correta

🤖 Optional AI Feature (Futuro)

Sugestão de barbeiro baseada em horários disponíveis

Personalidade: atendente experiente, direto e profissional

✅ Design Integrity Review

A homepage parece uma vitrine de marca forte?

O portfólio passa confiança sem precisar explicar?

Os barbeiros parecem profissionais de alto nível?

O agendamento é simples e rápido?

💈 Final Reflection

Este site não tenta convencer. Ele mostra o trabalho — e isso é o suficiente.

O cliente entra, vê o nível e pensa: “É aqui que eu vou cortar.”

Equipe: 2 barbeiros
Serviços: Vários serviços
Preços: Sim, visíveis
Confirmação: Direcionar para WhatsApp

Sobre os serviços: corte masculino, barba, sobrancelha, hidratação, combo corte+barba, etc.)

Sobre horários: 10h às 20h

Sobre as fotos: começamos com placeholders

Implementar o plano, mas adicionar seção de localização com mapa e horário de funcionamento
`;

export default function ReadyMadeSaaS() {
    const [pizzaPromptCopied, setPizzaPromptCopied] = useState(false);
    const [barberPromptCopied, setBarberPromptCopied] = useState(false);

    const handleCopyPrompt = (promptText: string, setCopied: (value: boolean) => void) => {
        navigator.clipboard.writeText(promptText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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

        <div className="space-y-12">
            {/* PizzaZap Card */}
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
                                            onClick={() => handleCopyPrompt(pizzaZapPrompt, setPizzaPromptCopied)}
                                            className="absolute top-2 right-2 text-zinc-400 hover:text-white hover:bg-zinc-700"
                                        >
                                            {pizzaPromptCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        
                        <div className="flex justify-center pt-2">
                            <GradientButton variant="variant">
                                Usar este modelo
                            </GradientButton>
                        </div>
                    </div>
                    
                    <div>
                         <Safari_01 url="https://pizza-hot-go.lovable.app" />
                    </div>

                </div>
            </div>

            {/* Barbearia King Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] rounded-2xl border border-zinc-800 shadow-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center">
                                <Scissors className="w-6 h-6 text-amber-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Barbearia King</h3>
                                <p className="text-sm text-zinc-400">Site premium para barbearia com agendamento online.</p>
                            </div>
                        </div>
                        <div className="text-sm text-zinc-300 space-y-1">
                            <p><span className="font-semibold text-zinc-400">Tecnologias:</span> React, TypeScript, TailwindCSS</p>
                            <p><span className="font-semibold text-zinc-400">Foco:</span> Marca forte, experiência premium.</p>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1" className="border-zinc-800">
                                <AccordionTrigger className="text-sm text-purple-400 hover:text-purple-300 hover:no-underline">Mostrar Prompt Usado</AccordionTrigger>
                                <AccordionContent>
                                    <div className="relative">
                                        <pre className="w-full bg-zinc-900/50 p-4 rounded-lg text-white/70 text-xs overflow-x-auto whitespace-pre-wrap font-mono h-64">
                                            {barbeariaKingPrompt}
                                        </pre>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handleCopyPrompt(barbeariaKingPrompt, setBarberPromptCopied)}
                                            className="absolute top-2 right-2 text-zinc-400 hover:text-white hover:bg-zinc-700"
                                        >
                                            {barberPromptCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        
                        <div className="flex justify-center pt-2">
                            <GradientButton variant="variant">
                                Usar este modelo
                            </GradientButton>
                        </div>
                    </div>
                    
                    <div>
                         <Safari_01 url="https://king-cut-book.lovable.app" />
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}
