import {NextRequest, NextResponse} from 'next/server';
import * as cheerio from 'cheerio';

type Resultado = {
  nome: string;
  endereco: string | null;
  horario: string | null;
  site: string | null;
  telefone: string | null;
};

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const busca = searchParams.get('busca');
  const cidade = searchParams.get('cidade');

  if (!busca || !cidade) {
    return NextResponse.json(
      {error: 'Parâmetros "busca" e "cidade" são obrigatórios.'},
      {status: 400}
    );
  }

  const searchQuery = `${busca} em ${cidade}`;
  const url = `https://www.google.com/search?q=${encodeURIComponent(
    searchQuery
  )}&tbm=lcl`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Falha ao buscar a página: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const resultados: Resultado[] = [];

    $('div.VkpGBb, div[jscontroller="xkZ6Lb"]').each((i, el) => {
      const nome = $(el).find('div[role="heading"]').text().trim();
      if (!nome) return;

      const resultado: Resultado = {
        nome,
        endereco: null,
        horario: null,
        site: null,
        telefone: null,
      };

      const detailsContainer = $(el).find('div.rllt__details');

      // Extrair informações com base nos links e texto
      detailsContainer.find('div').each((_, detailEl) => {
        const text = $(detailEl).text().trim();
        const link = $(detailEl).find('a').attr('href');
        
        // Endereço (geralmente não é um link, mas o primeiro item)
        if (!resultado.endereco && !link) {
           if (!text.includes('Aberto') && !text.includes('Fechado') && !text.includes('...')) {
                resultado.endereco = text;
           }
        }
        
        // Horário
        if (text.includes('Aberto') || text.includes('Fechado')) {
            resultado.horario = text;
        }
      });
      
      // Site
      detailsContainer.find('a[href*="url?q="]').each((_, siteEl) => {
          const siteHref = $(siteEl).attr('href');
          if (siteHref) {
            const urlParams = new URLSearchParams(siteHref);
            const realUrl = urlParams.get('q');
            if(realUrl) {
                resultado.site = new URL(realUrl).hostname;
                return false;
            }
          }
      });

      // Telefone
      detailsContainer.find('a[href^="tel:"]').each((_, phoneEl) => {
        const phoneText = $(phoneEl).text().trim();
        if (phoneText) {
          resultado.telefone = phoneText;
          return false;
        }
      });
      
      resultados.push(resultado);
    });

    return NextResponse.json(resultados);
  } catch (error: any) {
    console.error('Erro no scraper:', error);
    return NextResponse.json(
      {error: 'Ocorreu um erro ao processar a busca.'},
      {status: 500}
    );
  }
}
