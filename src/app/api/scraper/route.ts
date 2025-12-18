import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

type Resultado = {
  nome: string;
  endereco: string | null;
  horario: string | null;
  site: string | null;
  telefone: string | null;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const busca = searchParams.get('busca');
  const cidade = searchParams.get('cidade');

  if (!busca || !cidade) {
    return NextResponse.json(
      { error: 'Parâmetros "busca" e "cidade" são obrigatórios.' },
      { status: 400 }
    );
  }

  const searchQuery = `${busca} em ${cidade}`;
  // hl=pt-BR força o Google a retornar termos em português
  const url = `https://www.google.com/search?q=${encodeURIComponent(
    searchQuery
  )}&tbm=lcl&hl=pt-BR`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Falha ao buscar a página: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const resultados: Resultado[] = [];

    $('div.VkpGBb').each((i, el) => {
      const nome = $(el).find('div[role="heading"]').text().trim();
      if (!nome) return;

      const resultado: Resultado = {
        nome,
        endereco: null,
        horario: null,
        site: null,
        telefone: null,
      };

      const fullText = $(el).text();

      // --- 1. TELEFONE ---
      const phoneRegex = /\(?\d{2}\)?\s?\d{4,5}-?\d{4}/;
      const phoneMatch = fullText.match(phoneRegex);
      if (phoneMatch) {
        resultado.telefone = phoneMatch[0];
      }

      // --- 2. ENDEREÇO E HORÁRIO ---
      const detailsContainer = $(el).find('div.rllt__details');
      detailsContainer.find('div, span').each((_, detailEl) => {
        const text = $(detailEl).text().trim();
        
        if (text.includes('Aberto') || text.includes('Fechado') || text.includes('Fecha às')) {
           resultado.horario = text;
        } 
        else if (
            !resultado.endereco && 
            text.length > 10 && 
            text !== nome && 
            !text.match(phoneRegex) 
        ) {
            resultado.endereco = text;
        }
      });

      // --- 3. EXTRAÇÃO DO SITE ---
      $(el).find('a').each((_, linkEl) => {
        const href = $(linkEl).attr('href');
        
        if (!href) return;

        let potentialLink: string | null = null;

        // Extrai o link real de dentro do redirecionador do Google
        if (href.includes('/url?q=')) {
            const urlParams = new URLSearchParams(href.split('?')[1]);
            potentialLink = urlParams.get('q');
        } else if (href.startsWith('http')) {
            potentialLink = href;
        }

        if (potentialLink) {
            const ignoreList = ['google.com', 'google.com.br', 'gstatic.com', 'youtube.com'];
            const isGoogle = ignoreList.some(domain => potentialLink?.includes(domain));

            if (!isGoogle) {
                // AQUI ESTAVA O PROBLEMA:
                // Antes fazíamos "hostname.replace...", o que cortava o link.
                // Agora salvamos o link COMPLETO:
                resultado.site = potentialLink;
                
                return false; // Para de procurar ao encontrar o primeiro site válido
            }
        }
      });

      resultados.push(resultado);
    });

    return NextResponse.json(resultados);
  } catch (error: any) {
    console.error('Erro no scraper:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro ao processar a busca.' },
      { status: 500 }
    );
  }
}
