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
  const url = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&tbm=lcl`;

  try {
    const response = await fetch(url, {
      headers: {
        // O User-Agent ajuda a simular um navegador real.
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Falha ao buscar a página: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const resultados: {nome: string; info: string}[] = [];

    // Esta é a parte delicada. Os seletores do Google podem mudar.
    // Este seletor busca os cards de resultados locais.
    $('div.uMdZh.tIxAd.translate-y').each((i, el) => {
        if (resultados.length >= 10) return;

        const nomeEl = $(el).find('div.rllt__details div[role="heading"]');
        const nome = nomeEl.text().trim();

        // Tenta pegar o endereço ou a categoria como info
        const infoEl = $(el).find('div.rllt__details > div:nth-child(2)');
        let info = infoEl.text().trim();
        
        // Remove o texto do nome da string de info, se presente
        if (info.startsWith(nome)) {
            info = info.substring(nome.length).trim();
        }

        if (nome) {
            resultados.push({
                nome,
                info: info || 'N/A',
            });
        }
    });

    // Fallback para um seletor diferente se o primeiro não encontrar nada
    if (resultados.length === 0) {
        $('div.VkpGBb').each((i, el) => {
            if (resultados.length >= 10) return;

            const nome = $(el).find('div[role="heading"]').text().trim();
            const info = $(el).find('div.rllt__details > div:nth-child(2)').text().trim();

            if (nome) {
                resultados.push({
                    nome,
                    info: info.replace(nome, '').trim() || 'N/A'
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
