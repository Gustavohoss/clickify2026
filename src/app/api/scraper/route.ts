import {NextRequest, NextResponse} from 'next/server';
import * as cheerio from 'cheerio';

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
        // O User-Agent ajuda a simular um navegador real e a evitar bloqueios.
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Falha ao buscar a página: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const resultados: {nome: string; info: string}[] = [];

    // Seletor atualizado e mais genérico para os resultados de busca local.
    // O Google muda as classes com frequência. Este seletor busca pela estrutura.
    $('div[jscontroller="xkZ6Lb"]').each((i, el) => {
      if (resultados.length >= 10) return false; // Para o loop

      const nome = $(el).find('div[role="heading"]').text().trim();
      
      // Busca pelo contêiner de detalhes e pega o texto da segunda div filha.
      const infoContainer = $(el).find('div.rllt__details');
      const info = infoContainer.find('> div:nth-child(2)').text().trim();

      if (nome) {
        resultados.push({
          nome,
          info: info || 'N/A',
        });
      }
    });

    // Fallback para outros seletores se o principal não funcionar.
    if (resultados.length === 0) {
      $('div.VkpGBb').each((i, el) => {
        if (resultados.length >= 10) return false;

        const nome = $(el).find('div[role="heading"]').text().trim();
        const info = $(el)
          .find('div.rllt__details > div:nth-child(2)')
          .text()
          .trim();

        if (nome) {
          resultados.push({
            nome,
            info: info.replace(nome, '').trim() || 'N/A',
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
