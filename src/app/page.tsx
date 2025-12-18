'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {
  Loader2,
  AlertCircle,
  Phone,
  Globe,
  Clock,
  MapPin,
  ExternalLink
} from 'lucide-react';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';

type Resultado = {
  nome: string;
  endereco: string | null;
  horario: string | null;
  site: string | null;
  telefone: string | null;
};

export default function Home() {
  const [cidade, setCidade] = useState('');
  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setResultados([]);
    setError(null);
    setSearched(true);

    try {
      const response = await fetch(
        `/api/scraper?busca=${encodeURIComponent(busca)}&cidade=${encodeURIComponent(cidade)}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha na busca.');
      }

      const result = await response.json();

      if (result && result.length > 0) {
        setResultados(result);
      } else {
        setError('Nenhum resultado encontrado para sua busca.');
      }
    } catch (err: any) {
      console.error('Erro:', err);
      setError(err.message || 'Falha ao se comunicar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-4 md:p-10 max-w-4xl mx-auto">
      <Card className="mb-8 bg-card shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-card-foreground">
            Scraper de Mapas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              placeholder="Cidade (ex: São Paulo)"
              value={cidade}
              onChange={e => setCidade(e.target.value)}
              className="bg-input text-foreground"
            />
            <Input
              placeholder="O que buscar? (ex: Barbearia)"
              value={busca}
              onChange={e => setBusca(e.target.value)}
              className="bg-input text-foreground"
            />
          </div>

          <Button
            onClick={handleSearch}
            disabled={loading || !cidade || !busca}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Buscando...
              </>
            ) : (
              'Pesquisar'
            )}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {searched && !loading && !error && resultados.length === 0 && (
         <Alert className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Nenhum Resultado</AlertTitle>
          <AlertDescription>Nenhum resultado encontrado para a sua busca.</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {resultados.map((item, index) => (
          <Card key={index} className="bg-card shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg text-card-foreground">{item.nome}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {item.endereco && (
                <div className="flex items-start text-sm text-muted-foreground">
                  <MapPin className="mr-3 h-4 w-4 shrink-0 mt-1" />
                  <p>{item.endereco}</p>
                </div>
              )}
               {item.horario && (
                <div className="flex items-start text-sm text-muted-foreground">
                  <Clock className="mr-3 h-4 w-4 shrink-0 mt-1" />
                  <p>{item.horario}</p>
                </div>
              )}
              {item.site && (
                <div className="flex items-start text-sm text-muted-foreground group">
                  <Globe className="mr-3 h-4 w-4 shrink-0 mt-1" />
                    {/* AQUI FOI FEITA A MUDANÇA PRINCIPAL */}
                    <a 
                      href={item.site} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:underline break-all flex items-center gap-1"
                    >
                      {item.site}
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                </div>
              )}
              {item.telefone && (
                <div className="flex items-start text-sm text-muted-foreground">
                  <Phone className="mr-3 h-4 w-4 shrink-0 mt-1" />
                  <p>{item.telefone}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
