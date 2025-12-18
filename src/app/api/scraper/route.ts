import {NextRequest, NextResponse} from 'next/server';
import * as cheerio from 'cheerio';

// Regex para encontrar números de telefone no formato brasileiro.
// Cobre formatos como (XX) XXXX-XXXX, (XX) XXXXX-XXXX, etc.
const phoneRegex = /(?:\(?\d{2}\)?\s?)?(?:\d{4,5}-?\d{4})/g;

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

    const resultados: {nome: string; info: string; telefone: string | null;}[] = [];

    $('div[jscontroller="xkZ6Lb"]').each((i, el) => {
      if (resultados.length >= 10) return false;

      const nome = $(el).find('div[role="heading"]').text().trim();
      
      const infoContainer = $(el).find('div.rllt__details');
      const infoText = infoContainer.find('> div:nth-child(2)').text().trim();

      // Tenta extrair o telefone do texto de informações.
      const phoneMatches = infoText.match(phoneRegex);
      const telefone = phoneMatches ? phoneMatches[0] : null;

      // Remove o telefone do texto de info para não exibir duplicado.
      const info = telefone ? infoText.replace(telefone, '').trim() : infoText;


      if (nome) {
        resultados.push({
          nome,
          info: info || 'N/A',
          telefone,
        });
      }
    });

    // Fallback
    if (resultados.length === 0) {
      $('div.VkpGBb').each((i, el) => {
        if (resultados.length >= 10) return false;

        const nome = $(el).find('div[role="heading"]').text().trim();
        const infoText = $(el)
          .find('div.rllt__details > div:nth-child(2)')
          .text()
          .trim();
        
        const phoneMatches = infoText.match(phoneRegex);
        const telefone = phoneMatches ? phoneMatches[0] : null;
        const info = telefone ? infoText.replace(telefone, '').replace(nome, '').trim() : infoText.replace(nome, '').trim();

        if (nome) {
          resultados.push({
            nome,
            info: info || 'N/A',
            telefone,
          });
        }
      });
    }

    return NextResponse.json(resultados);
  } catch (error: any) {
    console.error('Erro no scraper:', error);
    return NextResponse.json(
      {error: 'Ocorreu um erro ao processar a busca.'},
      {status: 500}
    );
  }
}
