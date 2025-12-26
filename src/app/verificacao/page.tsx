'use client';
import { Hourglass, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function VerificationPage() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#0E101B] rounded-2xl border border-[#2A2D3C] shadow-2xl shadow-blue-500/10">
        <div className="text-center space-y-4">
          <Hourglass className="mx-auto h-12 w-12 text-blue-400" />
          <h1 className="text-2xl font-bold text-white">
            Conta em Verificação
          </h1>
          <p className="text-sm text-gray-400">
            Sua conta está sendo verificada para garantir a segurança e evitar robôs. Este processo pode levar até 1 hora. Agradecemos a sua paciência!
          </p>
           <p className="text-sm text-gray-400">
            Caso demore mais que o esperado, entre em contato com a nossa equipe.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            className="w-full border-gray-600 hover:bg-gray-800"
            onClick={() => router.push('/login')}
          >
            Entendi
          </Button>
          <a
            href="https://wa.me/55DDYYYYYXXXX" // Substitua pelo seu número do WhatsApp
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
              <MessageCircle className="mr-2 h-4 w-4" />
              Entrar em contato
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
