'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Loader2, AlertCircle} from 'lucide-react';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {searchAgent} from '@/ai/flows/search-agent';

export default function Home() {
  const [cidade, setCidade] = useState('');
  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setResultados([]);
    setError(null);

    try {
      const result = await searchAgent({busca, cidade});
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
      <Card className="mb-8 bg-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
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
            className="w-full"
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

      <div className="space-y-4">
        {resultados.map((item, index) => (
          <Card key={index} className="bg-card">
            <CardHeader>
              <CardTitle className="text-lg">{item.nome}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.info}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
